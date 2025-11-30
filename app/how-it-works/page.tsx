"use client";

import Footer from "@/components/Footer";
import ScanForm from "@/components/ScanForm";
import Link from "next/link";
import Image from "next/image";

export default function HowItWorksPage() {
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
            className="bg-[#F5C842] hover:bg-[#d4ab1f] text-gray-900 font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            FREE SCAN
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Hero Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full">
              <span className="text-[#2C5F7C] font-semibold text-sm">Powered by Opkie</span>
            </div>
            <h1 className="text-6xl font-bold text-[#2C5F7C] mb-6">
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
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#2C5F7C] to-[#1e4459] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                    1
                  </div>
                  {/* Connector Line */}
                  <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-[#2C5F7C] to-[#F5C842]"></div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-50 flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#2C5F7C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Fill Out the Form</h3>
                  <p className="text-gray-600">
                    Enter your practice details in our simple 2-minute form. We'll need your practice name, website, and location.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#F5C842] to-[#d4ab1f] rounded-full flex items-center justify-center text-gray-900 text-3xl font-bold shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                    2
                  </div>
                  {/* Connector Line */}
                  <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-[#F5C842] to-[#2C5F7C]"></div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-yellow-50 flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#F5C842]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">We Scan Your Presence</h3>
                  <p className="text-gray-600">
                    Our system automatically scans your online presence across Google Places, Bing, Yellow Pages, and more.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#2C5F7C] to-[#1e4459] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                    3
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-50 flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#2C5F7C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Get Your Results</h3>
                  <p className="text-gray-600">
                    Receive your detailed Digital Authority Score and actionable recommendations via email in 2-5 minutes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* What We Analyze */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Analyze</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#2C5F7C]">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  NAP Consistency
                </h3>
                <p className="text-gray-600">
                  We verify your Name, Address, and Phone number are consistent across Google Places, Bing Places, and Yellow Pages.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#2C5F7C]">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="text-2xl">🔍</span>
                  Directory Listings
                </h3>
                <p className="text-gray-600">
                  Check if your practice is listed on major business directories where potential patients search for dental services.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#F5C842]">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="text-2xl">📊</span>
                  Digital Authority Score
                </h3>
                <p className="text-gray-600">
                  Get a comprehensive score based on the TAPS framework (Total Authority Performance System) from 0-100.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#F5C842]">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  Actionable Insights
                </h3>
                <p className="text-gray-600">
                  Receive specific recommendations on what to fix to improve your score and attract more high-value patients.
                </p>
              </div>
            </div>
          </section>

          {/* Form Section */}
          <section className="mb-16">
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
