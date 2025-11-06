// components/AnalyticsTracker.tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

// Declare gtag for TypeScript
declare const gtag: Function;

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if gtag exists and is a function
    if (typeof gtag === "function") {
      const url =
        pathname +
        (searchParams.toString() ? `?${searchParams.toString()}` : "");

      gtag("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href,
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}
