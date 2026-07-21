import { getRazorpayInstance, verifyRazorpaySignature } from "./razorpay";
import { getProductBySlug, createOrderRecord, updateOrderPaymentSuccess, getOrderByOrderId } from "./database";

export interface CreateOrderParams {
  productSlug?: string;
  customerName: string;
  email: string;
  phone: string;
}

export interface CreateOrderResponse {
  success: boolean;
  orderId?: string;
  amount?: number; // in paise (e.g., 19900)
  currency?: string;
  productTitle?: string;
  error?: string;
}

export interface VerifyPaymentParams {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  customerName: string;
  email: string;
  phone: string;
  productSlug?: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  orderId?: string;
  paymentId?: string;
  redirectUrl?: string;
  error?: string;
}

/**
 * Creates a Razorpay Order server-side after fetching the true product price from Supabase.
 * NEVER trusts price sent from the client.
 */
export async function createPaymentOrder(params: CreateOrderParams): Promise<CreateOrderResponse> {
  const { productSlug = "kids-worksheets", customerName, email, phone } = params;

  if (!customerName || !email || !phone) {
    return { success: false, error: "Customer details (name, email, phone) are required." };
  }

  // 1. Fetch official product details from Supabase / database
  const product = await getProductBySlug(productSlug);
  if (!product || !product.active) {
    return { success: false, error: "Product not found or unavailable." };
  }

  // Amount in Paise (INR price * 100)
  const amountInPaise = product.price * 100;
  const razorpay = getRazorpayInstance();

  try {
    let orderId: string;

    // Check if Razorpay keys are configured or if we're in mock mode
    const isMock = !process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_KEY_SECRET.includes("placeholder");

    if (!isMock) {
      const razorpayOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: `rcpt_${Date.now()}`,
        notes: {
          customer_name: customerName,
          email: email,
          phone: phone,
          product_id: product.id,
          product_title: product.title,
        },
      });
      orderId = razorpayOrder.id;
    } else {
      // Mock order ID for local testing before user inputs live Razorpay keys
      orderId = `order_demo_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    }

    // 2. Persist initial order record in Supabase database
    await createOrderRecord({
      product_id: product.id,
      customer_name: customerName,
      email: email,
      phone: phone,
      amount: product.price,
      order_id: orderId,
      payment_status: "created",
    });

    return {
      success: true,
      orderId: orderId,
      amount: amountInPaise,
      currency: "INR",
      productTitle: product.title,
    };
  } catch (err: any) {
    console.error("Razorpay order creation error:", err);
    return { success: false, error: err.message || "Failed to create order on payment gateway." };
  }
}

/**
 * Verifies Razorpay payment signature server-side and updates database status.
 */
export async function verifyPaymentTransaction(params: VerifyPaymentParams): Promise<VerifyPaymentResponse> {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customerName, email, phone, productSlug = "kids-worksheets" } = params;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return { success: false, error: "Missing required payment verification tokens." };
  }

  const isMock = !process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_KEY_SECRET.includes("placeholder");

  let isValidSignature = false;

  if (isMock && razorpay_order_id.startsWith("order_demo_")) {
    // In demo / mock mode without live keys, treat signature as verified
    isValidSignature = true;
  } else {
    // Server-side HMAC SHA256 Verification
    isValidSignature = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
  }

  if (!isValidSignature) {
    return { success: false, error: "Payment verification failed: Invalid signature." };
  }

  // Fetch product for ID reference
  const product = await getProductBySlug(productSlug);

  // Record or update payment status in Supabase database
  await updateOrderPaymentSuccess(razorpay_order_id, razorpay_payment_id, razorpay_signature);

  return {
    success: true,
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    redirectUrl: `/thank-you?order_id=${encodeURIComponent(razorpay_order_id)}&payment_id=${encodeURIComponent(razorpay_payment_id)}`,
  };
}
