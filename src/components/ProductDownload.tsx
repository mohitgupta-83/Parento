"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, CheckCircle2, AlertCircle, BookOpen } from "lucide-react";

interface ProductDownloadProps {
  orderId: string;
  paymentId?: string;
}

export function ProductDownload({ orderId, paymentId }: ProductDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const [isAddonDownloading, setIsAddonDownloading] = useState(false);
  const [addonSuccess, setAddonSuccess] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleMainDownload = async () => {
    setIsDownloading(true);
    setErrorMsg(null);

    try {
      const url = `/api/download?order_id=${encodeURIComponent(orderId)}${
        paymentId ? `&payment_id=${encodeURIComponent(paymentId)}` : ""
      }`;

      const response = await fetch(url);

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to download worksheet PDF. Please try again.");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "Parento-15000-Printable-Kids-Worksheets-Bundle.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      setDownloadSuccess(true);
    } catch (err: any) {
      console.error("Download error:", err);
      setErrorMsg(err.message || "An error occurred downloading your PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleAddonDownload = async () => {
    setIsAddonDownloading(true);
    try {
      const response = await fetch("/downloads/babys-first-year-simplified.pdf");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "Babys-First-Year-Simplified-Ebook.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      setAddonSuccess(true);
    } catch (err: any) {
      console.error("Addon download error:", err);
    } finally {
      setIsAddonDownloading(false);
    }
  };

  return (
    <div className="w-full text-center space-y-4">
      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Worksheets Download Button */}
      <Button
        size="xl"
        fullWidth
        pulse
        onClick={handleMainDownload}
        disabled={isDownloading}
        icon={
          isDownloading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : downloadSuccess ? (
            <CheckCircle2 className="w-6 h-6 text-white" />
          ) : (
            <Download className="w-6 h-6" />
          )
        }
        className="bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] hover:from-[#43A047] hover:to-[#1B5E20] shadow-xl shadow-[#4CAF50]/25 text-base sm:text-lg py-4 sm:py-5"
      >
        {isDownloading
          ? "Preparing Worksheets Download..."
          : downloadSuccess
          ? "Worksheets Downloaded! Click to Download Again"
          : "Download 15,000+ Worksheets PDF (Instant)"}
      </Button>

      {/* Baby's First Year Simplified Add-On Download Button */}
      <div className="pt-2 border-t border-gray-200/60">
        <button
          onClick={handleAddonDownload}
          disabled={isAddonDownloading}
          className="w-full bg-white hover:bg-orange-50 border-2 border-[#FF8A00] rounded-2xl p-4 flex items-center gap-3 transition-all duration-300 group cursor-pointer text-left shadow-sm"
        >
          <div className="w-12 h-12 rounded-xl bg-[#FFF7ED] flex items-center justify-center flex-shrink-0 border border-[#FFEDD5]">
            <BookOpen className="w-6 h-6 text-[#FF8A00]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-extrabold text-[#1A1A2E] group-hover:text-[#FF8A00]">
              Download &quot;Baby&apos;s First Year Simplified&quot; Ebook (PDF)
            </div>
            <div className="text-xs text-gray-500">
              by Dr. Arpit Gupta · Practical Parenting Guide
            </div>
          </div>
          <div className="flex-shrink-0">
            {isAddonDownloading ? (
              <Loader2 className="w-5 h-5 text-[#FF8A00] animate-spin" />
            ) : addonSuccess ? (
              <CheckCircle2 className="w-5 h-5 text-[#4CAF50]" />
            ) : (
              <Download className="w-5 h-5 text-[#FF8A00] group-hover:scale-110 transition-transform" />
            )}
          </div>
        </button>
      </div>

      <p className="mt-2 text-xs text-gray-500 flex items-center justify-center gap-1.5">
        <span>🔒 Secure 256-bit encrypted stream</span>
        <span>•</span>
        <span>Format: Printable PDF</span>
      </p>
    </div>
  );
}
