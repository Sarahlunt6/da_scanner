"use client";

import Footer from "@/components/Footer";
import ScanForm from "@/components/ScanForm";
import Link from "next/link";
import Image from "next/image";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-yellow-50/30">
      {/* Header with HR4Sight Branding */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/hr4sight-logo.png"
                alt="HR4Sight"
                width={200}
                height={50}
                className="h-12 w-auto transform group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/how-it-works"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-all duration-200"
              >
                How It Works
              </Link>
              <Link
                href="/about-taps"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-all duration-200"
              >
                About TAPS
              </Link>
              <Link
                href="/"
                className="bg-[#fbab3f] hover:bg-[#e89a2d] text-gray-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm"
              >
                FREE SCAN
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Hero Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-semibold text-sm">Powered by HR4Sight</span>
            </div>
            <h1 className="text-6xl font-bold text-primary mb-6">
              How It Works
            </h1>
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
              Get your Digital Authority Score in three simple steps
            </p>
          </div>

          {/* Steps */}
          <section className="mb-16">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#1e2654] to-[#29377f] rounded-full flex items-center justify-center text-white text-4xl font-extrabold shadow-xl transform group-hover:scale-110 transition-transform duration-300 border-2 border-white">
                    1
                  </div>
                  {/* Connector Line */}
                  <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-secondary to-secondary/50"></div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-50 flex items-center justify-center">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Fill Out the Form</h3>
                  <p className="text-gray-600">
                    Enter your business details in our simple 2-minute form. We'll need your business name, website, and location.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center text-gray-900 text-4xl font-extrabold shadow-xl transform group-hover:scale-110 transition-transform duration-300 border-2 border-white">
                    2
                  </div>
                  {/* Connector Line */}
                  <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-secondary to-secondary/50"></div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-yellow-50 flex items-center justify-center">
                    <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">We Analyze Your Digital Presence</h3>
                  <p className="text-gray-600">
                    Our system automatically scans 47 data points across your online presence, including Google Business Profile, reviews, directories, and website authority.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#1e2654] to-[#29377f] rounded-full flex items-center justify-center text-white text-4xl font-extrabold shadow-xl transform group-hover:scale-110 transition-transform duration-300 border-2 border-white">
                    3
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-50 flex items-center justify-center">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Get Your Results</h3>
                  <p className="text-gray-600">
                    Receive your detailed Digital Authority Score and TAPS framework breakdown via email with actionable recommendations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* What We Analyze */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Analyze</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Trust & Credibility</h3>
                    <p className="text-gray-600">
                      Analyze your Google Business Profile, review velocity, ratings, and online reputation signals that build client trust.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Accessibility & Discoverability</h3>
                    <p className="text-gray-600">
                      Check NAP consistency, directory presence across top platforms, and how easily customers can find your business online.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-secondary">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-yellow-50 flex items-center justify-center">
                    <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Authority Score</h3>
                    <p className="text-gray-600">
                      Get a comprehensive Digital Authority score from 0-100 based on your business's performance across all TAPS pillars.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-secondary">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-yellow-50 flex items-center justify-center">
                    <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Actionable Recommendations</h3>
                    <p className="text-gray-600">
                      Receive specific, prioritized recommendations on how to improve your online presence and attract more high-value clients.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Form Section */}
          <section className="mb-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to See Your Score?</h2>
                <p className="text-lg text-gray-600">Fill out the form below to get started</p>
              </div>
              <ScanForm />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
