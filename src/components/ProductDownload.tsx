"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface ProductDownloadProps {
  orderId: string;
  paymentId?: string;
}

export function ProductDownload({ orderId, paymentId }: ProductDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDownload = async () => {
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

      // Trigger browser download via Blob
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

  return (
    <div className="w-full text-center">
      {errorMsg && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <Button
        size="xl"
        fullWidth
        pulse
        onClick={handleDownload}
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
        className="bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] hover:from-[#43A047] hover:to-[#1B5E20] shadow-xl shadow-[#4CAF50]/25 text-lg py-5"
      >
        {isDownloading
          ? "Preparing Your PDF Download..."
          : downloadSuccess
          ? "Downloaded! Click to Download Again"
          : "Download Worksheets PDF (Instant)"}
      </Button>

      <p className="mt-3 text-xs text-gray-500 flex items-center justify-center gap-1.5">
        <span>🔒 Secure 256-bit encrypted stream</span>
        <span>•</span>
        <span>Format: Printable PDF</span>
      </p>
    </div>
  );
}
