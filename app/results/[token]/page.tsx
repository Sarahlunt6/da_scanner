import { supabase } from "@/lib/supabase";
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
  const { data: scan, error } = await supabase
    .from("scans")
    .select("*")
    .eq("unique_token", token)
    .single();

  if (error || !scan) {
    notFound();
  }

  // Fetch module details
  const { data: modules } = await supabase
    .from("scan_details")
    .select("*")
    .eq("scan_id", scan.id)
    .order("created_at", { ascending: true });

  // If scan is still processing, show processing message
  if (scan.status === "processing") {
    return (
      <>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="bg-white rounded-lg shadow-lg p-12 border border-gray-200">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-secondary"></div>
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              </div>
              <h1 className="text-3xl font-bold text-primary mb-6">
                Analyzing Your Digital Authority...
              </h1>
              <p className="text-gray-700 text-lg">
                We're running a comprehensive scan of your online presence. This typically takes 5-10 minutes.
              </p>
              <p className="text-gray-600 mt-4">
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
    if (score >= 90) return { label: "Elite Performance", color: "text-green-700", bgColor: "bg-green-50", borderColor: "border-green-400" };
    if (score >= 70) return { label: "Above Average", color: "text-blue-700", bgColor: "bg-blue-50", borderColor: "border-blue-400" };
    if (score >= 50) return { label: "Average", color: "text-orange-700", bgColor: "bg-orange-50", borderColor: "border-orange-400" };
    return { label: "Failing", color: "text-red-700", bgColor: "bg-red-50", borderColor: "border-red-400" };
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
           name === 'Content Activity';
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
    return name === 'Semantic Analysis' || name === 'High Value Content' ||
           name === 'GBP Services';
  }) || [];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Branded Header */}
        <div style={{ backgroundColor: '#2C5F7C' }} className="shadow-lg">
          <div className="container mx-auto px-6 py-8 max-w-6xl">
            <div className="flex items-center justify-between">
              <div>
                <div style={{ color: '#FFD147' }} className="text-sm font-bold tracking-wider mb-2">OPKIE</div>
                <h1 className="text-3xl font-extrabold" style={{ color: '#FFFFFF' }}>Digital Authority Report</h1>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium mb-1" style={{ color: '#E0E7EE' }}>Practice Name</div>
                <div className="font-bold text-xl" style={{ color: '#FFFFFF' }}>{scan.practice_name}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-10 max-w-6xl">
          {/* Executive Summary Card */}
          <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden border border-gray-200">
            <div className="border-b-4 border-secondary px-8 py-6 bg-gradient-to-r from-gray-50 to-white">
              <h2 className="text-2xl font-bold text-gray-900">Executive Summary</h2>
              <p className="text-gray-600 mt-1">Overall Digital Authority Performance</p>
            </div>

            <div className="p-8">
              <div className="flex justify-center mb-10">
                {/* Score Display */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-56 h-56 mb-4">
                    <svg className="w-56 h-56 transform -rotate-90">
                      <circle
                        cx="112"
                        cy="112"
                        r="100"
                        stroke="#E5E7EB"
                        strokeWidth="20"
                        fill="none"
                      />
                      <circle
                        cx="112"
                        cy="112"
                        r="100"
                        stroke="#FFD147"
                        strokeWidth="20"
                        fill="none"
                        strokeDasharray={`${(scan.overall_score / 100) * 628.32} 628.32`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl font-black text-gray-900">{scan.overall_score}</div>
                        <div className="text-2xl text-gray-500 font-bold mt-1">/ 100</div>
                      </div>
                    </div>
                  </div>
                  <div className={`px-6 py-3 rounded-full ${tier.bgColor} border-2 ${tier.borderColor}`}>
                    <div className={`text-sm font-bold ${tier.color} text-center`}>{tier.label}</div>
                  </div>
                </div>
              </div>

              {/* Industry Benchmark */}
              <div className="border-t-2 border-gray-100 pt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">Industry Benchmark</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className={`text-center p-6 rounded-lg border-2 transition-all ${scan.overall_score >= 90 ? 'bg-green-50 border-green-500 shadow-lg transform scale-105' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-4xl font-black text-green-600 mb-2">90+</div>
                    <div className="text-sm font-bold text-gray-900">Elite Performance</div>
                    <div className="text-xs text-gray-600 mt-1">Top 5% of practices</div>
                  </div>
                  <div className={`text-center p-6 rounded-lg border-2 transition-all ${scan.overall_score >= 70 && scan.overall_score < 90 ? 'bg-blue-50 border-blue-500 shadow-lg transform scale-105' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-4xl font-black text-blue-600 mb-2">70-89</div>
                    <div className="text-sm font-bold text-gray-900">Above Average</div>
                    <div className="text-xs text-gray-600 mt-1">Top 25% of practices</div>
                  </div>
                  <div className={`text-center p-6 rounded-lg border-2 transition-all ${scan.overall_score >= 50 && scan.overall_score < 70 ? 'bg-orange-50 border-orange-500 shadow-lg transform scale-105' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-4xl font-black text-orange-600 mb-2">50-69</div>
                    <div className="text-sm font-bold text-gray-900">Average</div>
                    <div className="text-xs text-gray-600 mt-1">Middle 50% of practices</div>
                  </div>
                  <div className={`text-center p-6 rounded-lg border-2 transition-all ${scan.overall_score < 50 ? 'bg-red-50 border-red-500 shadow-lg transform scale-105' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-4xl font-black text-red-600 mb-2">&lt;50</div>
                    <div className="text-sm font-bold text-gray-900">Failing</div>
                    <div className="text-xs text-gray-600 mt-1">Bottom 25% of practices</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical SEO Area */}
          <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden border border-gray-200">
            <div style={{ backgroundColor: '#2C5F7C' }} className="px-8 py-6">
              <h3 style={{ color: '#FFFFFF' }} className="text-2xl font-bold">Technical SEO</h3>
              <p style={{ color: '#E0E7EE' }} className="mt-2">Foundational elements that help Google find and rank your practice</p>
            </div>

            <div className="bg-white">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Subcategory</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">What Google Looks For</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">What We Found</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {technicalSEOModules.map((module, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 font-medium text-gray-900">{module.module_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{module.data_json?.description || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{module.gap_message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Strategic SEO Area */}
          <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden border border-gray-200">
            <div style={{ backgroundColor: '#2C5F7C' }} className="px-8 py-6">
              <h3 style={{ color: '#FFFFFF' }} className="text-2xl font-bold">Strategic SEO</h3>
              <p style={{ color: '#E0E7EE' }} className="mt-2">Strategic signals that demonstrate authority and trustworthiness</p>
            </div>

            <div className="bg-white">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Subcategory</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">What Google Looks For</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">What We Found</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {strategicSEOModules.map((module, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 font-medium text-gray-900">{module.module_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{module.data_json?.description || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{module.gap_message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Technical Site Area */}
          <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden border border-gray-200">
            <div style={{ backgroundColor: '#2C5F7C' }} className="px-8 py-6">
              <h3 style={{ color: '#FFFFFF' }} className="text-2xl font-bold">Technical Site</h3>
              <p style={{ color: '#E0E7EE' }} className="mt-2">Technical performance and user experience factors</p>
            </div>

            <div className="bg-white">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Subcategory</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">What Google Looks For</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">What We Found</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {technicalSiteModules.map((module, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 font-medium text-gray-900">{module.module_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{module.data_json?.description || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{module.gap_message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Market Understanding Area */}
          <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden border border-gray-200">
            <div style={{ backgroundColor: '#2C5F7C' }} className="px-8 py-6">
              <h3 style={{ color: '#FFFFFF' }} className="text-2xl font-bold">Market Understanding</h3>
              <p style={{ color: '#E0E7EE' }} className="mt-2">How well your practice speaks to local patient needs</p>
            </div>

            <div className="bg-white">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Subcategory</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">What Google Looks For</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">What We Found</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {marketUnderstandingModules.map((module, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 font-medium text-gray-900">{module.module_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{module.data_json?.description || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{module.gap_message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Strategic Site Area */}
          <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden border border-gray-200">
            <div style={{ backgroundColor: '#2C5F7C' }} className="px-8 py-6">
              <h3 style={{ color: '#FFFFFF' }} className="text-2xl font-bold">Strategic Site</h3>
              <p style={{ color: '#E0E7EE' }} className="mt-2">High-value content that establishes topical authority</p>
            </div>

            <div className="bg-white">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Subcategory</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">What Google Looks For</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">What We Found</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {strategicSiteModules.map((module, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 font-medium text-gray-900">{module.module_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{module.data_json?.description || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{module.gap_message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Call to Action */}
          <div style={{ backgroundColor: '#2C5F7C' }} className="rounded-xl shadow-2xl overflow-hidden border-4 border-secondary">
            <div className="px-8 py-12 text-center">
              <h3 className="text-4xl font-black mb-4" style={{ color: '#FFFFFF' }}>
                Ready to Improve Your Score?
              </h3>
              <p className="text-xl mb-10 max-w-3xl mx-auto font-medium" style={{ color: '#E0E7EE' }}>
                Schedule a complimentary 15-minute strategy session to receive a personalized action plan for dominating your local market.
              </p>

              <div className="bg-white rounded-xl p-8 mb-10 max-w-2xl mx-auto shadow-2xl">
                <CalendarWidget className="text-center" />
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                  <div style={{ backgroundColor: '#FFD147' }} className="w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <svg className="w-10 h-10" style={{ color: '#2C5F7C' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="font-bold text-lg" style={{ color: '#FFFFFF' }}>No Long-Term Contracts</div>
                </div>
                <div className="flex flex-col items-center">
                  <div style={{ backgroundColor: '#FFD147' }} className="w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <svg className="w-10 h-10" style={{ color: '#2C5F7C' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="font-bold text-lg" style={{ color: '#FFFFFF' }}>2X ROI Guarantee</div>
                </div>
                <div className="flex flex-col items-center">
                  <div style={{ backgroundColor: '#FFD147' }} className="w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <svg className="w-10 h-10" style={{ color: '#2C5F7C' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="font-bold text-lg" style={{ color: '#FFFFFF' }}>Exclusive Territory</div>
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
