import { getRazorpayInstance, verifyRazorpaySignature } from "./razorpay";
import { getProductBySlug, createOrderRecord, updateOrderPaymentSuccess } from "./database";

export interface CreateOrderParams {
  productSlug?: string;
  customerName: string;
  email: string;
  phone: string;
  addOnSelected?: boolean;
}

export interface CreateOrderResponse {
  success: boolean;
  orderId?: string;
  amount?: number; // in paise
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
  addOnSelected?: boolean;
}

export interface VerifyPaymentResponse {
  success: boolean;
  orderId?: string;
  paymentId?: string;
  redirectUrl?: string;
  error?: string;
}

/**
 * Creates a Razorpay Order server-side after fetching product price from database.
 * Immediately saves the customer's details as an "abandoned" checkout in Supabase.
 */
export async function createPaymentOrder(params: CreateOrderParams): Promise<CreateOrderResponse> {
  const { productSlug = "kids-worksheets", customerName, email, phone, addOnSelected = false } = params;

  if (!customerName || !email || !phone) {
    return { success: false, error: "Customer details (name, email, phone) are required." };
  }

  // 1. Fetch official product details from Supabase / database
  const product = await getProductBySlug(productSlug);
  if (!product || !product.active) {
    return { success: false, error: "Product not found or unavailable." };
  }

  // Base price + ₹99 if Add-On selected
  const finalPriceInRupees = product.price + (addOnSelected ? 99 : 0);
  const amountInPaise = finalPriceInRupees * 100;
  const razorpay = getRazorpayInstance();

  try {
    let orderId: string;

    // Check if Razorpay live keys are configured
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
      orderId = `order_demo_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    }

    // 2. Persist order record in Supabase marked as "abandoned"
    // If the customer completes payment, verifyPayment will update status to "paid".
    await createOrderRecord({
      product_id: product.id,
      customer_name: customerName,
      email: email,
      phone: phone,
      amount: finalPriceInRupees,
      order_id: orderId,
      payment_status: "abandoned",
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
 * Verifies Razorpay payment signature server-side and updates status to "paid".
 */
export async function verifyPaymentTransaction(params: VerifyPaymentParams): Promise<VerifyPaymentResponse> {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customerName, email, phone, productSlug = "kids-worksheets" } = params;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return { success: false, error: "Missing required payment verification tokens." };
  }

  const isMock = !process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_KEY_SECRET.includes("placeholder");

  let isValidSignature = false;

  if (isMock && razorpay_order_id.startsWith("order_demo_")) {
    isValidSignature = true;
  } else {
    // Server-side HMAC SHA256 Verification
    isValidSignature = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
  }

  if (!isValidSignature) {
    return { success: false, error: "Payment verification failed: Invalid signature." };
  }

  // Update order status in Supabase database to "paid"
  await updateOrderPaymentSuccess(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    customerName,
    email,
    phone
  );

  return {
    success: true,
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    redirectUrl: `/thank-you?order_id=${encodeURIComponent(razorpay_order_id)}&payment_id=${encodeURIComponent(razorpay_payment_id)}`,
  };
}
