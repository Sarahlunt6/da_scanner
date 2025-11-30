import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AboutTAPSPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About TAPS
            </h1>
            <p className="text-xl text-gray-600">
              The Total Authority Performance System
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              TAPS (Total Authority Performance System) is a comprehensive framework designed to measure and improve your dental practice's digital authority. It evaluates your online presence across three critical phases to help you attract more high-value patients.
            </p>
          </section>

          {/* Phase 1 */}
          <section className="mb-12 bg-blue-50 rounded-xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                1
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Foundation</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              The foundation phase ensures your practice is discoverable and consistently represented across the web. We verify your presence on critical business directories like Google Places, Bing Places, and Yellow Pages.
            </p>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">What We Check:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>NAP Consistency (Name, Address, Phone) across directories</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Business listing presence on major platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Accurate contact information</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Phase 2 */}
          <section className="mb-12 bg-yellow-50 rounded-xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                2
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Visibility</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Phase 2 focuses on how easily potential patients can find you online and the quality of your digital presence when they do.
            </p>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Coming Soon:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">○</span>
                  <span>Search engine visibility analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">○</span>
                  <span>Review presence and ratings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">○</span>
                  <span>Social media engagement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">○</span>
                  <span>Website performance and user experience</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Phase 3 */}
          <section className="mb-12 bg-green-50 rounded-xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                3
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Authority</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Phase 3 measures your practice's credibility and trustworthiness in the digital ecosystem, which directly influences patient decision-making.
            </p>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Coming Soon:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">○</span>
                  <span>Domain authority and backlink profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">○</span>
                  <span>Content quality and expertise signals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">○</span>
                  <span>Patient testimonials and case studies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">○</span>
                  <span>Industry recognition and certifications</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Why TAPS Matters */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why TAPS Matters</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Attract High-Value Patients</h3>
                <p className="text-gray-700">
                  A strong digital authority score helps you attract patients seeking premium dental services, not just price shoppers.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Build Trust Instantly</h3>
                <p className="text-gray-700">
                  Consistent, accurate information across platforms builds credibility before patients even contact you.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Stay Competitive</h3>
                <p className="text-gray-700">
                  Know exactly where you stand compared to other practices in your area and what to improve.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Measurable Growth</h3>
                <p className="text-gray-700">
                  Track your improvements over time with concrete metrics and actionable insights.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to See Your Score?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Get your free Digital Authority scan and discover how to attract more high-value patients.
            </p>
            <a
              href="/"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-colors"
            >
              Get Your Free Scan
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
