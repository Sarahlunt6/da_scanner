"use client";

import Footer from "@/components/Footer";
import ScanForm from "@/components/ScanForm";
import Link from "next/link";
import Image from "next/image";

export default function AboutTAPSPage() {
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
                className="text-sm font-medium text-gray-700 hover:text-primary transition-all duration-200"
              >
                How It Works
              </Link>
              <Link
                href="/about-taps"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-all duration-200"
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
        <div className="max-w-5xl mx-auto px-4 py-16">
          {/* Hero Header with Animation */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl font-bold text-primary mb-6">
              About TAPS
            </h1>
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
              The Total Authority Performance System - A comprehensive framework measuring 5 key areas of digital authority
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-12 text-center max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-100">
              <p className="text-xl text-gray-700 leading-relaxed">
                TAPS is a comprehensive framework designed to <span className="font-semibold text-primary">measure and improve your dental practice's digital authority</span>. It evaluates your online presence across five critical areas to help you <span className="font-semibold text-secondary">attract more high-value patients</span>.
              </p>
            </div>
          </section>

          {/* The Five Areas - Grid Layout */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Five Areas</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Area 1: Technical SEO */}
              <div className="group">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="bg-[#1a1f4d] text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-black shadow-lg transform group-hover:scale-110 transition-transform duration-300 mb-3 border-4 border-secondary">
                      1
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Technical SEO</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                    Foundational elements that help Google find and rank your practice
                  </p>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">What We Check:</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5 text-lg font-bold">✓</span>
                        <span>Review Velocity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5 text-lg font-bold">✓</span>
                        <span>GBP Primary Category</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5 text-lg font-bold">✓</span>
                        <span>NAP Consistency</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5 text-lg font-bold">✓</span>
                        <span>Images</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Area 2: Strategic SEO */}
              <div className="group">
                <div className="bg-gradient-to-br from-secondary/20 to-secondary/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="bg-gradient-to-br from-secondary to-secondary/90 text-gray-900 rounded-full w-20 h-20 flex items-center justify-center text-3xl font-black shadow-lg transform group-hover:scale-110 transition-transform duration-300 mb-3 border-4 border-secondary">
                      2
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Strategic SEO</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                    Strategic signals that demonstrate authority and trustworthiness to search engines
                  </p>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">What We Check:</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-0.5 text-lg font-bold">✓</span>
                        <span>Review Sentiment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-0.5 text-lg font-bold">✓</span>
                        <span>Citations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-0.5 text-lg font-bold">✓</span>
                        <span>Content Activity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-0.5 text-lg font-bold">✓</span>
                        <span>GBP Services</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Area 3: Technical Site */}
              <div className="group">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="bg-[#1a1f4d] text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-black shadow-lg transform group-hover:scale-110 transition-transform duration-300 mb-3 border-4 border-secondary">
                      3
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Technical Site</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                    Technical performance and user experience factors that impact rankings
                  </p>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">What We Check:</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5 text-lg font-bold">✓</span>
                        <span>Site Speed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5 text-lg font-bold">✓</span>
                        <span>Mobile Optimization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5 text-lg font-bold">✓</span>
                        <span>Video Content</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row - Centered */}
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Area 4: Market Understanding */}
              <div className="group">
                <div className="bg-gradient-to-br from-secondary/20 to-secondary/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="bg-gradient-to-br from-secondary to-secondary/90 text-gray-900 rounded-full w-20 h-20 flex items-center justify-center text-3xl font-black shadow-lg transform group-hover:scale-110 transition-transform duration-300 mb-3 border-4 border-secondary">
                      4
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Market Understanding</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                    How well your practice speaks to local patient needs and community relevance
                  </p>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">What We Check:</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-0.5 text-lg font-bold">✓</span>
                        <span>Messaging Clarity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-0.5 text-lg font-bold">✓</span>
                        <span>Local Messages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-0.5 text-lg font-bold">✓</span>
                        <span>Messaging Integrity</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Area 5: Strategic Site */}
              <div className="group">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="bg-[#1a1f4d] text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-black shadow-lg transform group-hover:scale-110 transition-transform duration-300 mb-3 border-4 border-secondary">
                      5
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Strategic Site</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                    High-value content that establishes topical authority and expertise
                  </p>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">What We Check:</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5 text-lg font-bold">✓</span>
                        <span>Semantic Analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5 text-lg font-bold">✓</span>
                        <span>High Value Content</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why TAPS Matters */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Why TAPS Matters</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-primary">
                <div className="w-12 h-12 mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Attract High-Value Patients</h3>
                <p className="text-gray-700 leading-relaxed">
                  A strong digital authority score helps you attract patients seeking premium dental services, not just price shoppers.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-primary">
                <div className="w-12 h-12 mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Build Trust Instantly</h3>
                <p className="text-gray-700 leading-relaxed">
                  Consistent, accurate information across platforms builds credibility before patients even contact you.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-secondary">
                <div className="w-12 h-12 mb-4 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Stay Competitive</h3>
                <p className="text-gray-700 leading-relaxed">
                  Know exactly where you stand compared to other practices in your area and what to improve.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-secondary">
                <div className="w-12 h-12 mb-4 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Measurable Growth</h3>
                <p className="text-gray-700 leading-relaxed">
                  Track your improvements over time with concrete metrics and actionable insights.
                </p>
              </div>
            </div>
          </section>

          {/* Form Section */}
          <section className="mb-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to See Your Score?</h2>
                <p className="text-lg text-gray-600">Fill out the form below to get your Digital Authority Score</p>
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
