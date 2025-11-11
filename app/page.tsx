"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";

// Format phone number as user types
const formatPhoneNumber = (value: string) => {
  const phoneNumber = value.replace(/\D/g, '');
  if (phoneNumber.length <= 3) {
    return phoneNumber;
  } else if (phoneNumber.length <= 6) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  } else {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  }
};

export default function HomePage() {
  const [formData, setFormData] = useState({
    practiceName: "",
    websiteUrl: "",
    email: "",
    phone: "",
    contactName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = `/processing?token=${data.token}`;
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50/30">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/opkie-logo.png" alt="Opkie" width={120} height={40} className="h-10 w-auto" />
              <span className="text-sm text-gray-600 hidden sm:inline border-l pl-3 border-gray-300">Digital Authority Scanner</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#how-it-works" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors hidden md:inline">
                How It Works
              </a>
              <a href="#about" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors hidden md:inline">
                About TAPS
              </a>
              <div className="text-sm text-gray-900 bg-secondary px-5 py-2 rounded-lg font-bold shadow-md">
                FREE SCAN
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Column - Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
                FREE DIGITAL AUTHORITY SCAN
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                What's Blocking{" "}
                <span className="text-primary relative inline-block">
                  High-Value Patients
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 8C40 4 80 2 120 4C160 6 180 8 200 7" stroke="#FFC629" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                </span>{" "}
                From Finding You?
              </h1>

              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Find out your <span className="font-bold text-gray-900">Digital Authority Score</span> and discover why{" "}
                <span className="font-bold text-primary">95% of dental practices</span> are invisible to patients
                searching for implants, veneers, and Invisalign.
              </p>

              {/* Benefits List */}
              <div className="space-y-5 mb-10">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">47 Data Points Analyzed</p>
                    <p className="text-gray-600">Comprehensive scan across Google, reviews, and directories</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Results in 2-5 Minutes</p>
                    <p className="text-gray-600">Get your detailed report delivered via email</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Actionable Recommendations</p>
                    <p className="text-gray-600">Know exactly what to fix to attract more patients</p>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="grid grid-cols-3 gap-6 p-6 bg-gradient-to-br from-primary to-primary/80 rounded-2xl text-white shadow-lg">
                <div className="text-center">
                  <div className="text-4xl font-extrabold mb-1">200+</div>
                  <div className="text-sm text-white/90">Practices Scanned</div>
                </div>
                <div className="text-center border-x border-white/20">
                  <div className="text-4xl font-extrabold mb-1">95%</div>
                  <div className="text-sm text-white/90">Score Below 75%</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-extrabold mb-1">2.4x</div>
                  <div className="text-sm text-white/90">Higher Conversion</div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-primary/20 relative overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-secondary/20 to-primary/10 rounded-bl-full"></div>

                <div className="relative">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Get Your Free Scan</h2>
                    <p className="text-gray-600 font-medium">No credit card required • 2-minute form</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Practice Name */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Practice Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.practiceName}
                        onChange={(e) => setFormData({ ...formData, practiceName: e.target.value })}
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
                        placeholder="Main Street Dental"
                      />
                    </div>

                    {/* Website URL */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Website URL
                      </label>
                      <input
                        type="url"
                        required
                        value={formData.websiteUrl}
                        onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
                        placeholder="https://yourpractice.com"
                      />
                    </div>

                    {/* Email and Phone */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          Your Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
                          placeholder="(555) 123-4567"
                          maxLength={14}
                        />
                      </div>
                    </div>

                    {/* Your Name */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
                        placeholder="Dr. John Smith"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-lg transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analyzing Your Practice...
                        </>
                      ) : (
                        <>
                          Get My Free Scan Now
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </button>

                    {/* Trust Badges */}
                    <div className="pt-6 flex items-center justify-center gap-5 text-xs text-gray-600 border-t border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span className="font-medium">HIPAA Compliant</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="font-medium">Data Secured</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span className="font-medium">No Obligations</span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
