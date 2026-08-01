import { Suspense } from "react";
import { BabyFoodSuccessCard } from "@/components/BabyFoodSuccessCard";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { CheckoutProvider } from "@/context/CheckoutContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Successful! — Download Your Recipe Ebooks | Parento",
  description: "Thank you for your purchase! Download your healthy weight gain recipe ebooks for toddlers.",
  robots: { index: false, follow: false },
};

interface ThankYouPageProps {
  searchParams: Promise<{
    order_id?: string;
    payment_id?: string;
  }>;
}

import { FacebookPixel } from "@/lib/pixel";

async function ThankYouContent({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;
  const orderId = params.order_id || "order_demo_success";
  const paymentId = params.payment_id;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7ED] via-white to-[#F0FFF4] pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <FacebookPixel pixelId="1654475442282882" productName="Healthy Weight Gain Recipes For Children" price={299} />
      <BabyFoodSuccessCard orderId={orderId} paymentId={paymentId} />
    </div>
  );
}

export default function BabyFoodThankYouPage(props: ThankYouPageProps) {
  return (
    <CheckoutProvider>
      <Header />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center pt-28">
            <div className="w-10 h-10 border-4 border-[#FF8A00]/20 border-t-[#FF8A00] rounded-full animate-spin" />
          </div>
        }
      >
        <ThankYouContent searchParams={props.searchParams} />
      </Suspense>
      <Footer />
    </CheckoutProvider>
  );
}
