"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayButtonProps {
  customerName: string;
  email: string;
  phone: string;
  productSlug?: string;
  addOnSelected?: boolean;
  onSuccess?: () => void;
  onError?: (errorMessage: string) => void;
  className?: string;
  children?: React.ReactNode;
}

export function RazorpayButton({
  customerName,
  email,
  phone,
  productSlug = "kids-worksheets",
  addOnSelected = false,
  onSuccess,
  onError,
  className,
  children,
}: RazorpayButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // 1. Create Razorpay order via backend API
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customerName,
          email: email,
          phone: phone,
          productSlug: productSlug,
          addOnSelected: addOnSelected,
        }),
      });

      const data = await response.json();

      if (!data.success || !data.orderId) {
        throw new Error(data.error || "Failed to initialize order.");
      }

      // Check if server is running with mock keys
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      const isPlaceholderKey = !razorpayKey || razorpayKey.includes("your_razorpay");

      if (isPlaceholderKey || data.orderId.startsWith("order_demo_")) {
        // Simulated checkout demo flow for preview before live credentials
        console.log("Demo checkout mode active. Simulating payment verification...");
        const mockVerifyRes = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: data.orderId,
            razorpay_payment_id: `pay_demo_${Date.now()}`,
            razorpay_signature: "mock_signature_demo",
            name: customerName,
            email: email,
            phone: phone,
            productSlug: productSlug,
          }),
        });

        const verifyData = await mockVerifyRes.json();
        if (verifyData.success) {
          if (onSuccess) onSuccess();
          router.push(verifyData.redirectUrl);
          return;
        }
      }

      // 2. Load Razorpay script
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error("Razorpay SDK failed to load. Please check your internet connection.");
      }

      // 3. Configure Razorpay Standard Checkout Popup Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: data.amount, // in paise
        currency: data.currency || "INR",
        name: siteConfig.brand.name,
        description: data.productTitle || siteConfig.product.name,
        image: siteConfig.brand.logo || "/logo.svg",
        order_id: data.orderId,
        prefill: {
          name: customerName,
          email: email,
          contact: phone,
        },
        notes: {
          product: siteConfig.product.shortName,
        },
        theme: {
          color: siteConfig.colors.primary,
        },
        handler: async function (response: any) {
          try {
            // 4. Server-Side Signature & Payment Verification
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                name: customerName,
                email: email,
                phone: phone,
                productSlug: productSlug,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              if (onSuccess) onSuccess();
              router.push(verifyData.redirectUrl);
            } else {
              throw new Error(verifyData.error || "Payment verification failed.");
            }
          } catch (err: any) {
            setErrorMessage(err.message || "Payment verification failed.");
            if (onError) onError(err.message);
          } finally {
            setIsLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
            console.log("Customer closed Razorpay popup.");
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on("payment.failed", function (response: any) {
        setIsLoading(false);
        const failMsg = response.error?.description || "Payment failed or was cancelled.";
        setErrorMessage(failMsg);
        if (onError) onError(failMsg);
      });

      razorpayInstance.open();
    } catch (err: any) {
      setIsLoading(false);
      const msg = err.message || "An error occurred starting checkout.";
      setErrorMessage(msg);
      if (onError) onError(msg);
    }
  };

  return (
    <div className="w-full">
      {errorMessage && (
        <div className="mb-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <Button
        size="lg"
        fullWidth
        pulse
        onClick={handlePayment}
        disabled={isLoading}
        className={className}
        icon={isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShoppingCart className="w-5 h-5" />}
      >
        {isLoading ? "Processing Checkout..." : children || `Get Instant Access — ₹${siteConfig.product.price}`}
      </Button>
    </div>
  );
}
