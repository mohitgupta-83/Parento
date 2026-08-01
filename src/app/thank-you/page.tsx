import { Suspense } from "react";
import { SuccessCard } from "@/components/SuccessCard";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { CheckoutProvider } from "@/context/CheckoutContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Successful! — Thank You | Parento",
  description: "Thank you for your purchase! Download your 15,000+ printable kids worksheets bundle.",
  robots: { index: false, follow: false },
};

interface ThankYouPageProps {
  searchParams: Promise<{
    order_id?: string;
    payment_id?: string;
    addon?: string;
  }>;
}

async function ThankYouContent({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;
  const orderId = params.order_id || "order_demo_success";
  const paymentId = params.payment_id;
  const hasAddon = params.addon === "1" || params.addon === "true";

  return (
    <div className="min-h-screen gradient-hero pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <SuccessCard orderId={orderId} paymentId={paymentId} hasAddon={hasAddon} />
    </div>
  );
}

export default function ThankYouPage(props: ThankYouPageProps) {
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
