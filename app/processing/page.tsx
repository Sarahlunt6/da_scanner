"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const scanSteps = [
  { label: "Federal Employment Law Compliance", delay: 0 },
  { label: "State-Specific Regulations Review", delay: 2000 },
  { label: "FMLA & Leave Policy Assessment", delay: 4000 },
  { label: "FLSA & Wage Compliance Check", delay: 6000 },
  { label: "ADA Accessibility Requirements", delay: 8000 },
  { label: "Title VII & EEO Compliance", delay: 10000 },
  { label: "OSHA Safety Standards Review", delay: 12000 },
  { label: "Multi-State Compliance Analysis", delay: 14000 },
  { label: "Calculating HR Compliance Score", delay: 16000 },
];

function ProcessingContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const scanId = searchParams.get("scanId");
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    console.log('Processing page loaded with token:', token, 'scanId:', scanId);

    // Show animated progress steps
    scanSteps.forEach((step, index) => {
      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, index]);
      }, step.delay);
    });

    // Trigger the actual scan processing in the background
    if (scanId) {
      console.log('Triggering scan processing for scanId:', scanId);
      fetch('/api/process-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scanId }),
      }).then(async response => {
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Scan processing started successfully:', data);
        } else {
          const error = await response.text();
          console.error('❌ Failed to start scan processing:', response.status, error);
        }
      }).catch(error => {
        console.error('❌ Error triggering scan:', error);
      });
    } else {
      console.warn('⚠️ No scanId provided - scan will not be processed!');
    }

    // Redirect after all steps are complete (18 seconds total)
    setTimeout(() => {
      window.location.href = `/scan-complete?token=${token}`;
    }, 18000);
  }, [token, scanId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50/30 flex items-center justify-center py-12 px-4">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-primary/20">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Analyzing Your HR Compliance...
            </h1>
            <p className="text-lg text-gray-600">
              We're reviewing <span className="font-bold text-primary">key compliance areas</span> across federal and state employment laws
            </p>
          </div>

          {/* Checklist */}
          <div className="space-y-3 mb-8">
            {scanSteps.map((step, index) => {
              const isCompleted = completedSteps.includes(index);
              const isActive = completedSteps.length === index;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                    isCompleted
                      ? "bg-green-50 border-2 border-green-200"
                      : isActive
                      ? "bg-primary/5 border-2 border-primary/30 scale-105"
                      : "bg-gray-50 border-2 border-gray-100"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? "bg-green-500"
                        : isActive
                        ? "bg-primary animate-pulse"
                        : "bg-gray-300"
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span
                    className={`font-medium transition-colors duration-300 ${
                      isCompleted
                        ? "text-green-700"
                        : isActive
                        ? "text-primary font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </span>
                  {isActive && (
                    <div className="ml-auto">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
            <p className="text-gray-700 text-lg">
              Your detailed report will be emailed to you in{" "}
              <span className="font-bold text-primary">5-10 minutes</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProcessingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
      </div>
    }>
      <ProcessingContent />
    </Suspense>
  );
}
