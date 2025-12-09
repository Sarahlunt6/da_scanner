"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ScanCompleteContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50/30 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-green-200 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Your HR Compliance Assessment is Complete!
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            We've finished analyzing your organization's compliance with federal and state employment laws.
          </p>

          {/* Info Box */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 mb-8">
            <div className="flex items-start gap-4 text-left">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Check Your Email
                </h3>
                <p className="text-gray-700">
                  Your detailed <span className="font-bold text-primary">HR Compliance Score</span> and comprehensive report will be delivered to your inbox in the next{" "}
                  <span className="font-bold">5-10 minutes</span>.
                </p>
              </div>
            </div>
          </div>

          {/* What to Expect */}
          <div className="text-left space-y-4 mb-8">
            <h3 className="font-bold text-gray-900 text-lg mb-4">What's in Your Report:</h3>

            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <p className="text-gray-700">Your overall <strong>HR Compliance Score</strong> (0-100)</p>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <p className="text-gray-700"><strong>Compliance breakdown</strong> across federal and state requirements</p>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <p className="text-gray-700">Detailed gaps and <strong>actionable next steps</strong></p>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <p className="text-gray-700">How you compare to <strong>top-performing companies</strong> in your industry</p>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Didn't receive your email? Check your spam folder or{" "}
              <a href="mailto:support@hr4sight.com" className="text-primary hover:underline font-semibold">
                contact us
              </a>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary font-medium transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ScanCompletePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50/30 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
      </div>
    }>
      <ScanCompleteContent />
    </Suspense>
  );
}
