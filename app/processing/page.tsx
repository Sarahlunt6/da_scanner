"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const statusMessages = [
  "Checking Google Business Profile health...",
  "Scanning 7 critical directories...",
  "Analyzing website trust signals...",
  "Comparing you to top-performing practices in your area...",
  "Calculating your Digital Authority Score...",
];

export default function ProcessingPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % statusMessages.length);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="bg-white rounded-lg shadow-xl p-12">
          <h1 className="text-3xl font-bold text-primary mb-6">
            Analyzing Your Digital Authority...
          </h1>

          {/* Animated spinner */}
          <div className="flex justify-center mb-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
          </div>

          {/* Rotating status messages */}
          <p className="text-xl text-gray-700 mb-8 min-h-[60px] flex items-center justify-center">
            {statusMessages[currentMessage]}
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-gray-700">
              We're checking <span className="font-bold">47 data points</span>.
              Results will be emailed to your address in{" "}
              <span className="font-bold">2-5 minutes</span>.
            </p>
          </div>

          <div className="text-sm text-gray-500">
            <p>Token: {token}</p>
          </div>
        </div>

        {/* Optional case study link */}
        <div className="mt-8 text-center">
          <a
            href="#"
            className="text-primary hover:underline"
          >
            While you wait: See how Dr. Martinez went from 12 to 34 new patients/month →
          </a>
        </div>
      </div>
    </div>
  );
}
