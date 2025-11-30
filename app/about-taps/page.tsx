"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function AboutTAPSPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-yellow-50/30">
      {/* Header with Opkie Branding */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/opkie-logo.png"
              alt="Opkie"
              width={120}
              height={40}
              className="h-10 w-auto transform group-hover:scale-105 transition-transform duration-300"
            />
            <span className="text-sm text-gray-600 hidden sm:inline border-l pl-3 border-gray-300">Digital Authority Scanner</span>
          </Link>
          <Link
            href="/"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            FREE SCAN
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-16">
          {/* Hero Header with Animation */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full">
              <span className="text-blue-700 font-semibold text-sm">Powered by Opkie</span>
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">
              About TAPS
            </h1>
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
              The Total Authority Performance System
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-16 text-center max-w-3xl mx-auto">
            <p className="text-xl text-gray-700 leading-relaxed">
              TAPS is a comprehensive framework designed to measure and improve your dental practice's digital authority. It evaluates your online presence across three critical phases to help you attract more high-value patients.
            </p>
          </section>

          {/* Phase 1 */}
          <section className="mb-12 group">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Foundation</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                The foundation phase ensures your practice is discoverable and consistently represented across the web. We verify your presence on critical business directories like Google Places, Bing Places, and Yellow Pages.
              </p>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">What We Check:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-200">
                    <span className="text-blue-600 mt-1 text-xl font-bold">✓</span>
                    <span>NAP Consistency (Name, Address, Phone) across directories</span>
                  </li>
                  <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-200">
                    <span className="text-blue-600 mt-1 text-xl font-bold">✓</span>
                    <span>Business listing presence on major platforms</span>
                  </li>
                  <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-200">
                    <span className="text-blue-600 mt-1 text-xl font-bold">✓</span>
                    <span>Accurate contact information</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Phase 2 */}
          <section className="mb-12 group">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Visibility</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                Phase 2 focuses on how easily potential patients can find you online and the quality of your digital presence when they do.
              </p>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Coming Soon:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3 opacity-60 hover:opacity-100 transition-opacity duration-200">
                    <span className="text-yellow-500 mt-1 text-xl">○</span>
                    <span>Search engine visibility analysis</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-60 hover:opacity-100 transition-opacity duration-200">
                    <span className="text-yellow-500 mt-1 text-xl">○</span>
                    <span>Review presence and ratings</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-60 hover:opacity-100 transition-opacity duration-200">
                    <span className="text-yellow-500 mt-1 text-xl">○</span>
                    <span>Social media engagement</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-60 hover:opacity-100 transition-opacity duration-200">
                    <span className="text-yellow-500 mt-1 text-xl">○</span>
                    <span>Website performance and user experience</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Phase 3 */}
          <section className="mb-16 group">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Authority</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                Phase 3 measures your practice's credibility and trustworthiness in the digital ecosystem, which directly influences patient decision-making.
              </p>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Coming Soon:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3 opacity-60 hover:opacity-100 transition-opacity duration-200">
                    <span className="text-green-600 mt-1 text-xl">○</span>
                    <span>Domain authority and backlink profile</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-60 hover:opacity-100 transition-opacity duration-200">
                    <span className="text-green-600 mt-1 text-xl">○</span>
                    <span>Content quality and expertise signals</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-60 hover:opacity-100 transition-opacity duration-200">
                    <span className="text-green-600 mt-1 text-xl">○</span>
                    <span>Patient testimonials and case studies</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-60 hover:opacity-100 transition-opacity duration-200">
                    <span className="text-green-600 mt-1 text-xl">○</span>
                    <span>Industry recognition and certifications</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Why TAPS Matters */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Why TAPS Matters</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-blue-200">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Attract High-Value Patients</h3>
                <p className="text-gray-700 leading-relaxed">
                  A strong digital authority score helps you attract patients seeking premium dental services, not just price shoppers.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-blue-200">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Build Trust Instantly</h3>
                <p className="text-gray-700 leading-relaxed">
                  Consistent, accurate information across platforms builds credibility before patients even contact you.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-blue-200">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Stay Competitive</h3>
                <p className="text-gray-700 leading-relaxed">
                  Know exactly where you stand compared to other practices in your area and what to improve.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-blue-200">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Measurable Growth</h3>
                <p className="text-gray-700 leading-relaxed">
                  Track your improvements over time with concrete metrics and actionable insights.
                </p>
              </div>
            </div>
          </section>

          {/* CTA with Opkie Branding */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl transform rotate-1"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-white shadow-2xl">
              <div className="text-center">
                <div className="inline-block mb-4">
                  <Image
                    src="/opkie-logo.png"
                    alt="Opkie"
                    width={150}
                    height={50}
                    className="brightness-0 invert opacity-90"
                  />
                </div>
                <h2 className="text-4xl font-bold mb-4">Ready to See Your Score?</h2>
                <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                  Get your free Digital Authority scan and discover how to attract more high-value patients.
                </p>
                <Link
                  href="/"
                  className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-10 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  Get Your Free Scan →
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
