import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import CalendarWidget from "@/components/CalendarWidget";

interface ResultsPageProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  const { token } = await params;

  // Fetch scan results and module details
  const scanResult = await sql`
    SELECT * FROM scans WHERE unique_token = ${token} LIMIT 1
  `;

  const scan = scanResult.rows[0];

  if (!scan) {
    notFound();
  }

  // Fetch module details
  const modulesResult = await sql`
    SELECT * FROM scan_details
    WHERE scan_id = ${scan.id}
    ORDER BY created_at ASC
  `;

  const modules = modulesResult.rows;

  // If scan is still processing, show processing message
  if (scan.status === "processing") {
    return (
      <>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-12 border border-gray-200">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-secondary"></div>
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
                Analyzing Your Digital Authority...
              </h1>
              <p className="text-gray-700 text-base sm:text-lg">
                We're running a comprehensive scan of your online presence. This typically takes 5-10 minutes.
              </p>
              <p className="text-gray-600 mt-4 text-sm sm:text-base">
                Results will be emailed to <span className="font-semibold text-primary">{scan.email}</span>
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const getScoreTier = (score: number) => {
    // Always return "An Undiscovered Expert" for all scores
    return {
      label: "An Undiscovered Expert",
      subtext: "You're great, so why doesn't Google know it?",
      color: "text-blue-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-400"
    };
  };

  const tier = getScoreTier(scan.overall_score || 0);

  // Group modules by area
  const technicalSEOModules = modules?.filter(m => {
    const name = m.module_name;
    return name === 'Review Velocity' || name === 'GBP Primary Category' ||
           name === 'NAP Consistency' || name === 'Images';
  }) || [];

  const strategicSEOModules = modules?.filter(m => {
    const name = m.module_name;
    return name === 'Review Sentiment' || name === 'Citations' ||
           name === 'Content Activity' || name === 'GBP Services';
  }) || [];

  const technicalSiteModules = modules?.filter(m => {
    const name = m.module_name;
    return name === 'Site Speed' || name === 'Mobile Optimization' ||
           name === 'Video Content';
  }) || [];

  const marketUnderstandingModules = modules?.filter(m => {
    const name = m.module_name;
    return name === 'Messaging Clarity' || name === 'Local Messages' ||
           name === 'Messaging Integrity';
  }) || [];

  const strategicSiteModules = modules?.filter(m => {
    const name = m.module_name;
    return name === 'Semantic Analysis' || name === 'High Value Content';
  }) || [];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Branded Header */}
        <div className="bg-gradient-to-br from-[#1e2654] to-[#29377f] shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-6xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src="/hr4sight-logo.png" alt="HR4Sight" className="h-12 sm:h-14 w-auto" />
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white">Digital Authority Report</h1>
                  <p className="text-sm text-white/80 mt-0.5">Powered by TAPS Framework</p>
                </div>
              </div>
              <div className="sm:text-right">
                <div className="text-xs sm:text-sm font-medium mb-1 text-white/70">Business Name</div>
                <div className="font-bold text-base sm:text-lg text-white">{scan.practice_name}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10 max-w-6xl">
          {/* Executive Summary Card */}
          <div className="bg-white rounded-xl shadow-lg mb-6 sm:mb-8 overflow-hidden border border-gray-200">
            <div className="border-b-4 border-secondary px-4 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-gray-50 to-white">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Executive Summary</h2>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Overall Digital Authority Performance</p>
            </div>

            <div className="p-4 sm:p-8">
              {/* "The Internet Sees You As..." Tagline */}
              <div className="text-center mb-6 sm:mb-8">
                <p className="text-lg sm:text-xl text-gray-600 mb-2">The internet sees you as...</p>
                <h3 className="text-2xl sm:text-4xl font-black text-primary mb-2">{tier.label}</h3>
                <p className="text-sm sm:text-base text-gray-600 italic max-w-2xl mx-auto">{tier.subtext}</p>
              </div>

              <div className="flex justify-center mb-6 sm:mb-10">
                {/* Score Display */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-40 h-40 sm:w-56 sm:h-56 mb-4">
                    <svg className="w-40 h-40 sm:w-56 sm:h-56 transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#E5E7EB"
                        strokeWidth="16"
                        fill="none"
                        className="sm:hidden"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#fbab3f"
                        strokeWidth="16"
                        fill="none"
                        strokeDasharray={`${(scan.overall_score / 100) * 439.82} 439.82`}
                        strokeLinecap="round"
                        className="sm:hidden"
                      />
                      <circle
                        cx="112"
                        cy="112"
                        r="100"
                        stroke="#E5E7EB"
                        strokeWidth="20"
                        fill="none"
                        className="hidden sm:block"
                      />
                      <circle
                        cx="112"
                        cy="112"
                        r="100"
                        stroke="#fbab3f"
                        strokeWidth="20"
                        fill="none"
                        strokeDasharray={`${(scan.overall_score / 100) * 628.32} 628.32`}
                        strokeLinecap="round"
                        className="hidden sm:block"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl sm:text-6xl font-black text-gray-900">{scan.overall_score}</div>
                        <div className="text-lg sm:text-2xl text-gray-500 font-bold mt-1">/ 100</div>
                      </div>
                    </div>
                  </div>
                  <div className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full ${tier.bgColor} border-2 ${tier.borderColor}`}>
                    <div className={`text-xs sm:text-sm font-bold ${tier.color} text-center`}>{tier.label}</div>
                  </div>
                </div>
              </div>

              {/* Industry Benchmark */}
              <div className="border-t-2 border-gray-100 pt-6 sm:pt-8">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-center">Industry Benchmark</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className={`text-center p-4 sm:p-6 rounded-lg border-2 transition-all ${scan.overall_score >= 90 ? 'bg-green-50 border-green-500 shadow-lg sm:transform sm:scale-105' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-2xl sm:text-4xl font-black text-green-600 mb-1 sm:mb-2">90+</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900">Elite Performance</div>
                    <div className="text-xs text-gray-600 mt-1 hidden sm:block">Top 5% of practices</div>
                  </div>
                  <div className={`text-center p-4 sm:p-6 rounded-lg border-2 transition-all ${scan.overall_score >= 70 && scan.overall_score < 90 ? 'bg-blue-50 border-blue-500 shadow-lg sm:transform sm:scale-105' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-2xl sm:text-4xl font-black text-blue-600 mb-1 sm:mb-2">70-89</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900">Above Average</div>
                    <div className="text-xs text-gray-600 mt-1 hidden sm:block">Top 25% of practices</div>
                  </div>
                  <div className={`text-center p-4 sm:p-6 rounded-lg border-2 transition-all ${scan.overall_score >= 50 && scan.overall_score < 70 ? 'bg-orange-50 border-orange-500 shadow-lg sm:transform sm:scale-105' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-2xl sm:text-4xl font-black text-orange-600 mb-1 sm:mb-2">50-69</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900">Average</div>
                    <div className="text-xs text-gray-600 mt-1 hidden sm:block">Middle 50% of practices</div>
                  </div>
                  <div className={`text-center p-4 sm:p-6 rounded-lg border-2 transition-all ${scan.overall_score < 50 ? 'bg-red-50 border-red-500 shadow-lg sm:transform sm:scale-105' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-2xl sm:text-4xl font-black text-red-600 mb-1 sm:mb-2">&lt;50</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900">Failing</div>
                    <div className="text-xs text-gray-600 mt-1 hidden sm:block">Bottom 25% of practices</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TAPS Scores Breakdown */}
          {scan.results_json?.areaScores && (
            <div className="bg-white rounded-xl shadow-lg mb-6 sm:mb-8 overflow-hidden border border-gray-200">
              <div className="border-b-4 border-secondary px-4 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-gray-50 to-white">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">TAPS Framework Breakdown</h2>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">Performance scores across all 5 TAPS pillars</p>
              </div>

              <div className="p-4 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
                  <div className="text-center p-4 sm:p-6 rounded-lg border-2 border-gray-200 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all">
                    <div className="text-4xl sm:text-5xl font-black text-primary mb-2">{scan.results_json.areaScores.trust_score}</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900">Trust & Credibility</div>
                  </div>
                  <div className="text-center p-4 sm:p-6 rounded-lg border-2 border-gray-200 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all">
                    <div className="text-4xl sm:text-5xl font-black text-primary mb-2">{scan.results_json.areaScores.accessibility_score}</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900">Accessibility & Discoverability</div>
                  </div>
                  <div className="text-center p-4 sm:p-6 rounded-lg border-2 border-gray-200 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all">
                    <div className="text-4xl sm:text-5xl font-black text-primary mb-2">{scan.results_json.areaScores.positioning_score}</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900">Positioning</div>
                  </div>
                  <div className="text-center p-4 sm:p-6 rounded-lg border-2 border-gray-200 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all">
                    <div className="text-4xl sm:text-5xl font-black text-primary mb-2">{scan.results_json.areaScores.site_authority_score}</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900">Site Authority</div>
                  </div>
                  <div className="text-center p-4 sm:p-6 rounded-lg border-2 border-gray-200 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all">
                    <div className="text-4xl sm:text-5xl font-black text-primary mb-2">{scan.results_json.areaScores.strategic_seo_score}</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900">Strategic SEO</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Trust & Credibility */}
          <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-br from-[#1e2654] to-[#29377f] px-4 sm:px-8 py-4 sm:py-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Trust & Credibility</h3>
                  <p className="mt-2 text-sm sm:text-base text-white/80">Google reviews, ratings, and customer sentiment that build credibility</p>
                </div>
                {scan.results_json?.areaScores?.trust_score && (
                  <div className="ml-4 flex-shrink-0">
                    <div className="text-4xl sm:text-5xl font-black text-white">{scan.results_json.areaScores.trust_score}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-4">What goes into this score:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {technicalSEOModules.map((module, idx) => (
                  <div key={idx} className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-3">{module.module_name}</h4>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {module.data_json?.description || 'Description not available'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Accessibility & Discoverability */}
          <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-br from-[#1e2654] to-[#29377f] px-4 sm:px-8 py-4 sm:py-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Accessibility & Discoverability</h3>
                  <p className="mt-2 text-sm sm:text-base text-white/80">NAP consistency, directory presence, and GBP optimization</p>
                </div>
                {scan.results_json?.areaScores?.accessibility_score && (
                  <div className="ml-4 flex-shrink-0">
                    <div className="text-4xl sm:text-5xl font-black text-white">{scan.results_json.areaScores.accessibility_score}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-4">What goes into this score:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {strategicSEOModules.map((module, idx) => (
                  <div key={idx} className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-3">{module.module_name}</h4>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {module.data_json?.description || 'Description not available'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Positioning */}
          <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-br from-[#1e2654] to-[#29377f] px-4 sm:px-8 py-4 sm:py-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Positioning</h3>
                  <p className="mt-2 text-sm sm:text-base text-white/80">GBP categories, services, messaging, and local relevance</p>
                </div>
                {scan.results_json?.areaScores?.positioning_score && (
                  <div className="ml-4 flex-shrink-0">
                    <div className="text-4xl sm:text-5xl font-black text-white">{scan.results_json.areaScores.positioning_score}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-4">What goes into this score:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {technicalSiteModules.map((module, idx) => (
                  <div key={idx} className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-3">{module.module_name}</h4>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {module.data_json?.description || 'Description not available'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Site Authority */}
          <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-br from-[#1e2654] to-[#29377f] px-4 sm:px-8 py-4 sm:py-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Site Authority</h3>
                  <p className="mt-2 text-sm sm:text-base text-white/80">Technical SEO, page speed, mobile optimization, and content quality</p>
                </div>
                {scan.results_json?.areaScores?.site_authority_score && (
                  <div className="ml-4 flex-shrink-0">
                    <div className="text-4xl sm:text-5xl font-black text-white">{scan.results_json.areaScores.site_authority_score}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-4">What goes into this score:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {marketUnderstandingModules.map((module, idx) => (
                  <div key={idx} className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-3">{module.module_name}</h4>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {module.data_json?.description || 'Description not available'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Strategic SEO */}
          <div className="bg-white rounded-xl shadow-lg mb-6 sm:mb-8 overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-br from-[#1e2654] to-[#29377f] px-4 sm:px-8 py-4 sm:py-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Strategic SEO</h3>
                  <p className="mt-2 text-sm sm:text-base text-white/80">High-value content and semantic analysis that attracts qualified clients</p>
                </div>
                {scan.results_json?.areaScores?.strategic_seo_score && (
                  <div className="ml-4 flex-shrink-0">
                    <div className="text-4xl sm:text-5xl font-black text-white">{scan.results_json.areaScores.strategic_seo_score}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-4">What goes into this score:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {strategicSiteModules.map((module, idx) => (
                  <div key={idx} className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-3">{module.module_name}</h4>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {module.data_json?.description || 'Description not available'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-[#1e2654] to-[#29377f] rounded-xl shadow-2xl overflow-hidden border-4 border-[#fbab3f]">
            <div className="px-4 sm:px-8 py-10 sm:py-14 text-center">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-white">
                Ready to Improve Your Score?
              </h3>
              <p className="text-lg sm:text-xl md:text-2xl mb-10 sm:mb-12 max-w-3xl mx-auto font-medium text-white">
                Schedule a complimentary 15-minute strategy session to receive a personalized action plan for dominating your local market.
              </p>

              <div className="bg-white rounded-2xl p-6 sm:p-10 mb-10 sm:mb-12 max-w-2xl mx-auto shadow-2xl">
                <CalendarWidget className="text-center" />
              </div>

              <div className="grid sm:grid-cols-3 gap-8 sm:gap-10 max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                  <div className="bg-[#fbab3f] w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-4 sm:mb-5 shadow-xl">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#1e2654]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="font-bold text-lg sm:text-xl text-white">No Long-Term Contracts</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-[#fbab3f] w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-4 sm:mb-5 shadow-xl">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#1e2654]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="font-bold text-lg sm:text-xl text-white">2X ROI Guarantee</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-[#fbab3f] w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-4 sm:mb-5 shadow-xl">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#1e2654]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="font-bold text-lg sm:text-xl text-white">Exclusive Territory</div>
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
