"use client";

import { useEffect, useRef } from "react";

interface CalendarWidgetProps {
  /**
   * The GHL calendar embed code (iframe + script tag)
   * Get this from: Calendars > Calendar Settings > Share > Embed Code
   */
  embedCode?: string;
  className?: string;
}

export default function CalendarWidget({ embedCode, className = "" }: CalendarWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!embedCode || !containerRef.current) return;

    // Clear any existing content
    containerRef.current.innerHTML = "";

    // Create a temporary container to parse the embed code
    const temp = document.createElement("div");
    temp.innerHTML = embedCode;

    // Extract and append all elements (iframe, script tags, etc.)
    Array.from(temp.children).forEach((child) => {
      if (containerRef.current) {
        containerRef.current.appendChild(child.cloneNode(true));
      }
    });

    // If there are script tags, we need to re-execute them
    const scripts = temp.getElementsByTagName("script");
    Array.from(scripts).forEach((script) => {
      const newScript = document.createElement("script");
      if (script.src) {
        newScript.src = script.src;
      } else {
        newScript.textContent = script.textContent;
      }
      if (script.type) {
        newScript.type = script.type;
      }
      document.body.appendChild(newScript);
    });

    // Cleanup function
    return () => {
      // Remove dynamically added scripts
      const addedScripts = document.querySelectorAll('script[src*="leadconnectorhq"], script[src*="msgsndr"]');
      addedScripts.forEach((script) => script.remove());
    };
  }, [embedCode]);

  if (!embedCode) {
    return (
      <div className={`bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center ${className}`}>
        <p className="text-gray-600 mb-4">Calendar booking widget will appear here.</p>
        <p className="text-sm text-gray-500">
          Add your GHL calendar embed code to <code className="bg-gray-200 px-2 py-1 rounded">NEXT_PUBLIC_GHL_CALENDAR_EMBED</code> environment variable.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`calendar-widget-container ${className}`}
      style={{ minHeight: "600px" }}
    />
  );
}
