"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

/**
 * Utility function to trigger Facebook Meta Pixel Events
 */
export function trackMetaEvent(
  eventName: "PageView" | "ViewContent" | "InitiateCheckout" | "Purchase" | string,
  params: Record<string, any> = {}
) {
  if (typeof window === "undefined") return;

  let retries = 0;
  const fire = () => {
    if (window.fbq) {
      try {
        window.fbq("track", eventName, params);
        console.log("[Meta Pixel Event Fired]: " + eventName, params);
      } catch (err) {
        console.warn("[Meta Pixel Error]: Failed to track event", err);
      }
    } else if (retries < 15) {
      retries++;
      setTimeout(fire, 300);
    }
  };

  fire();
}

interface FacebookPixelProps {
  pixelId?: string;
  productName?: string;
  price?: number;
  currency?: string;
}

/**
 * Facebook Meta Pixel Component to inject Pixel script dynamically
 */
export function FacebookPixel({
  pixelId,
  productName,
  price = 1,
  currency = "INR",
}: FacebookPixelProps) {
  useEffect(() => {
    if (!pixelId || !pixelId.trim()) return;

    const cleanPixelId = pixelId.trim();
    const scriptId = "fb-pixel-" + cleanPixelId;

    if (document.getElementById(scriptId)) return;

    const safeName = (productName || "").replace(/'/g, "\\'");

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";

    let pixelCode =
      "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?" +
      "n.callMethod.apply(n,arguments):n.queue.push(arguments)};" +
      "if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';" +
      "n.queue=[];t=b.createElement(e);t.async=!0;" +
      "t.src=v;s=b.getElementsByTagName(e)[0];" +
      "s.parentNode.insertBefore(t,s)}(window, document,'script'," +
      "'https://connect.facebook.net/en_US/fbevents.js');" +
      "fbq('init', '" + cleanPixelId + "');" +
      "fbq('track', 'PageView');";

    if (productName) {
      pixelCode +=
        "fbq('track', 'ViewContent', { content_name: '" +
        safeName +
        "', value: " +
        price +
        ", currency: '" +
        currency +
        "' });";
    }

    const inlineScript = document.createElement("script");
    inlineScript.id = scriptId + "-init";
    inlineScript.innerHTML = pixelCode;

    document.head.appendChild(inlineScript);
  }, [pixelId, productName, price, currency]);

  return null;
}
