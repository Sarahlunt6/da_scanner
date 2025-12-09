"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function AboutHR4SightPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-yellow-50/30">
      {/* Header */}
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
                href="/about-hr4sight"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-all duration-200"
              >
                About HR4Sight
              </Link>
              <Link
                href="/"
                className="bg-secondary hover:bg-secondary/90 text-gray-900 font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                FREE ASSESSMENT
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
              About HR4Sight™
            </h1>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              The all-in-one source for current HR and employment laws as well as upcoming and proposed changes
            </p>
          </div>

          {/* What is HR4Sight */}
          <section className="mb-16 bg-white rounded-2xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is HR4Sight?</h2>
            <div className="space-y-4 text-lg text-gray-600">
              <p>
                HR 4Sight™ is an all-in-one source for current HR and employment laws as well as upcoming and proposed changes.
              </p>

              <div className="bg-primary/5 rounded-xl p-6 my-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">HR 4Sight™ will help you:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>Get and stay compliant</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>Reduce wasted time, frustration and anxiety</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>Save your company money</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>Minimize employer risk</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 font-medium">
                Since 2008, EmploymentLawHandbook.com has been the most trusted online source for HR and employment law information. Each year, HR Professionals like you visit our site millions of times.
              </p>
              <p>
                They have told us what they need–faster and easier access to accurate information about current and changing laws. The result is HR 4Sight™.
              </p>
            </div>
          </section>

          {/* Why HR Professionals Need This */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-[#1e2654] to-[#29377f] text-white rounded-2xl p-8 md:p-12 shadow-xl border-2 border-secondary/30">
              <h2 className="text-3xl font-bold mb-6 text-white">We Know You Work Hard</h2>
              <div className="space-y-4 text-lg text-white">
                <p>
                  Let's be honest. As an HR Professional, it's easy to feel overwhelmed. Whether it's recruiting, onboarding, retraining or working with employees, your responsibilities are never-ending.
                </p>
                <p>
                  On top of that, you walk the tightrope of trying to keep both the bosses and employees happy all while making sure that your company is compliant with ever-changing employment laws.
                </p>
                <p className="font-bold text-secondary text-xl">
                  That's where HR 4Sight™ comes in.
                </p>
                <p>
                  Making even one employee mistake can cost your company dearly–and cost you your job. HR 4Sight™ will keep you on top of current and changing employment laws while you focus on your other responsibilities.
                </p>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Powerful Features for HR Professionals</h2>
            <div className="grid md:grid-cols-2 gap-8">

              {/* proTRACK */}
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">proTRACK™</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Each year, over 100,000 federal and state bills and regulations are proposed. No HR professional has time to review them all.
                </p>
                <p className="text-gray-700 font-medium">
                  proTRACK™ is the only HR-specific legislative and regulation tracker. It is built on NexisLexis' State Net and employs proprietary querying and filtering of state and federal legislation and regulations. Then, HR 4Sight's licensed employment lawyers categorize and tag all HR-related bills.
                </p>
              </div>

              {/* proCOMPLY */}
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">proCOMPLY™</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Our clients have told us that in addition to searching current and proposed laws, they want to be alerted with urgent information about upcoming deadlines and change dates.
                </p>
                <p className="text-gray-700 font-medium">
                  proCOMPLY™ provides members-only email alerts for new employment law bills and laws with essential dates. PRO+ members can download spreadsheets with even more information than our email alerts.
                </p>
              </div>

              {/* proSHARE */}
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-secondary">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center">
                    <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">proSHARE™</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We know that finding the information you are looking for is just the beginning for HR Professionals.
                </p>
                <p className="text-gray-700 font-medium">
                  proSHARE™ is a suite of productivity and efficiency tools that help you get the right information in the right hands in the right format. Edit, print, save to PDF, and email directly from webpages and posts.
                </p>
              </div>

              {/* proSEARCH */}
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-secondary">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center">
                    <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">proSEARCH™</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  When you are looking for answers, you need to find information that you can count on to be correct but you can't afford to spend too much time searching.
                </p>
                <p className="text-gray-700 font-medium">
                  proSEARCH™ is your answer. Our exclusive search functionality helps you find the right information fast, with links to source government website pages.
                </p>
              </div>

            </div>
          </section>

          {/* Video Section */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">See HR4Sight in Action</h2>
              <div className="max-w-4xl mx-auto">
                <div className="relative rounded-xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/en4BUemNH0c?si=3fdg0i7Fza6mfS2O"
                    title="HR4Sight Explanation"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-[#1e2654] to-[#29377f] text-white rounded-2xl p-12 shadow-2xl border-2 border-secondary/30">
              <h2 className="text-4xl font-bold mb-4 text-white">Ready to Get Started?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto text-white">
                Visit HR4Sight.com to learn more about our membership plans and start your free trial today.
              </p>
              <a
                href="https://hr4sight.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-secondary hover:bg-secondary/90 text-gray-900 font-extrabold py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl text-xl shadow-xl border-2 border-white/30"
              >
                Visit HR4Sight.com →
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
