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
    if (score >= 90) return { label: "Elite Performance", color: "text-green-700", bg: "bg-green-50", accent: "bg-green-600" };
    if (score >= 75) return { label: "Strong Performer", color: "text-blue-700", bg: "bg-blue-50", accent: "bg-blue-600" };
    if (score >= 60) return { label: "Opportunity for Growth", color: "text-orange-700", bg: "bg-orange-50", accent: "bg-orange-600" };
    return { label: "Critical Attention Required", color: "text-red-700", bg: "bg-red-50", accent: "bg-red-600" };
  };

  const getStatusColor = (status: string) => {
    if (status === "excellent") return "text-green-700";
    if (status === "good") return "text-blue-700";
    if (status === "needs_work") return "text-orange-700";
    return "text-red-700";
  };

  const getModuleDescription = (moduleName: string): string => {
    const descriptions: { [key: string]: string } = {
      "Profit Zone": "Your Google Business Profile category setup. Are you in the right profit-generating categories for your services?",
      "Product Shelf": "The services listed on your Google Business Profile. More = better visibility for specific searches.",
      "Review Boost": "Your overall Google review rating and total review count. This is your trust score.",
      "Review Velocity": "How consistently you're getting new reviews. Sporadic reviews signal an inactive practice to Google.",
      "NAP Consistency": "Is your Name, Address, and Phone number identical across all directories? Inconsistencies confuse Google and hurt rankings.",
      "Core 30 Authority Asset": "Do you have the 30 essential service pages that establish topical authority for dental searches?",
      "Technical Trust Signals": "Your website's technical health: SSL, mobile speed, schema markup, and load time.",
      "Directory Dominance": "Are you listed on the key dental directories that Google uses to verify your legitimacy?",
    };
    return descriptions[moduleName] || "";
  };

  const tier = getScoreTier(scan.overall_score || 0);

  // Group modules by phase
  const phase1Modules = modules?.filter(m => m.module_name.includes("Zone") || m.module_name.includes("Shelf") || m.module_name.includes("Review") || m.module_name.includes("NAP")) || [];
  const phase2Modules = modules?.filter(m => m.module_name.includes("Core 30") || m.module_name.includes("Technical")) || [];
  const phase3Modules = modules?.filter(m => m.module_name.includes("Directory")) || [];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header with Opkie branding */}
        <div className="bg-primary text-white py-6 shadow-md">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Digital Authority Report</h1>
                <p className="text-primary-light mt-1 text-sm">Powered by Opkie</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-primary-light">Practice</div>
                <div className="font-semibold text-lg">{scan.practice_name}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-5xl">
          {/* Executive Summary */}
          <div className="bg-white rounded-lg shadow-lg border-t-4 border-secondary mb-8 overflow-hidden">
            <div className="p-8 md:p-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-gray-100">
                Executive Summary
              </h2>

              <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
                {/* Score Circle */}
                <div className="flex justify-center">
                  <div className="relative">
                    <svg className="w-64 h-64 transform -rotate-90">
                      <circle
                        cx="128"
                        cy="128"
                        r="110"
                        stroke="#E5E7EB"
                        strokeWidth="16"
                        fill="none"
                      />
                      <circle
                        cx="128"
                        cy="128"
                        r="110"
                        stroke="#FFD147"
                        strokeWidth="16"
                        fill="none"
                        strokeDasharray={`${(scan.overall_score / 100) * 691.15} 691.15`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl font-extrabold text-primary">{scan.overall_score}</div>
                        <div className="text-2xl text-gray-600 font-semibold">/ 100</div>
                        <div className={`text-sm font-bold mt-2 ${tier.color}`}>{tier.label}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-primary/5 to-transparent p-4 rounded-lg border-l-4 border-primary">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">Phase 1: Local Foundation</span>
                      <span className="text-2xl font-bold text-primary">{scan.phase1_score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-primary h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${scan.phase1_score}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">50% of total score</div>
                  </div>

                  <div className="bg-gradient-to-r from-primary/5 to-transparent p-4 rounded-lg border-l-4 border-primary">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">Phase 2: Digital Assets</span>
                      <span className="text-2xl font-bold text-primary">{scan.phase2_score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-primary h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${scan.phase2_score}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">35% of total score</div>
                  </div>

                  <div className="bg-gradient-to-r from-primary/5 to-transparent p-4 rounded-lg border-l-4 border-primary">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">Phase 3: Market Presence</span>
                      <span className="text-2xl font-bold text-primary">{scan.phase3_score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-primary h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${scan.phase3_score}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">15% of total score</div>
                  </div>
                </div>
              </div>

              {/* Benchmark Comparison */}
              <div className={`${tier.bg} rounded-lg p-6 border border-gray-200`}>
                <h3 className="font-bold text-gray-900 mb-4 text-center">Industry Benchmark</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`text-center p-4 rounded-lg transition-all ${scan.overall_score >= 90 ? 'bg-white shadow-md ring-2 ring-green-500' : 'bg-white/60'}`}>
                    <div className="text-3xl font-bold text-green-600 mb-1">90+</div>
                    <div className="text-sm font-semibold text-gray-700">Elite</div>
                    <div className="text-xs text-gray-500 mt-1">Top 5%</div>
                  </div>
                  <div className={`text-center p-4 rounded-lg transition-all ${scan.overall_score >= 75 && scan.overall_score < 90 ? 'bg-white shadow-md ring-2 ring-blue-500' : 'bg-white/60'}`}>
                    <div className="text-3xl font-bold text-blue-600 mb-1">75-89</div>
                    <div className="text-sm font-semibold text-gray-700">Strong</div>
                    <div className="text-xs text-gray-500 mt-1">Top 20%</div>
                  </div>
                  <div className={`text-center p-4 rounded-lg transition-all ${scan.overall_score >= 60 && scan.overall_score < 75 ? 'bg-white shadow-md ring-2 ring-orange-500' : 'bg-white/60'}`}>
                    <div className="text-3xl font-bold text-orange-600 mb-1">60-74</div>
                    <div className="text-sm font-semibold text-gray-700">Average</div>
                    <div className="text-xs text-gray-500 mt-1">40%</div>
                  </div>
                  <div className={`text-center p-4 rounded-lg transition-all ${scan.overall_score < 60 ? 'bg-white shadow-md ring-2 ring-red-500' : 'bg-white/60'}`}>
                    <div className="text-3xl font-bold text-red-600 mb-1">&lt;60</div>
                    <div className="text-sm font-semibold text-gray-700">At Risk</div>
                    <div className="text-xs text-gray-500 mt-1">Bottom 40%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase Details */}
          {/* Phase 1 */}
          <div className="bg-white rounded-lg shadow-lg border-l-4 border-secondary mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-primary-light mb-1">PHASE 1</div>
                  <h3 className="text-2xl font-bold">Local Foundation</h3>
                  <p className="text-sm text-primary-light mt-1">Google Business Profile & Review System</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-extrabold">{scan.phase1_score}</div>
                  <div className="text-sm">out of 100</div>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="space-y-4">
                {phase1Modules.map((module, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-lg text-gray-900">{module.module_name}</h4>
                          <div className={`px-3 py-1 rounded-full text-sm font-bold ${module.score >= 80 ? 'bg-green-100 text-green-700' : module.score >= 60 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                            {module.score}%
                          </div>
                        </div>
                        {getModuleDescription(module.module_name) && (
                          <p className="text-sm text-gray-600 mb-3">{getModuleDescription(module.module_name)}</p>
                        )}
                        {module.gap_message && (
                          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                            <p className="text-sm text-gray-800 font-medium">{module.gap_message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="bg-white rounded-lg shadow-lg border-l-4 border-secondary mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-primary-light mb-1">PHASE 2</div>
                  <h3 className="text-2xl font-bold">Digital Assets</h3>
                  <p className="text-sm text-primary-light mt-1">Website Authority & Technical Foundation</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-extrabold">{scan.phase2_score}</div>
                  <div className="text-sm">out of 100</div>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="space-y-4">
                {phase2Modules.map((module, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-lg text-gray-900">{module.module_name}</h4>
                          <div className={`px-3 py-1 rounded-full text-sm font-bold ${module.score >= 80 ? 'bg-green-100 text-green-700' : module.score >= 60 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                            {module.score}%
                          </div>
                        </div>
                        {getModuleDescription(module.module_name) && (
                          <p className="text-sm text-gray-600 mb-3">{getModuleDescription(module.module_name)}</p>
                        )}
                        {module.gap_message && (
                          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                            <p className="text-sm text-gray-800 font-medium">{module.gap_message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="bg-white rounded-lg shadow-lg border-l-4 border-secondary mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-primary-light mb-1">PHASE 3</div>
                  <h3 className="text-2xl font-bold">Market Presence</h3>
                  <p className="text-sm text-primary-light mt-1">Directory Coverage & Review Consistency</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-extrabold">{scan.phase3_score}</div>
                  <div className="text-sm">out of 100</div>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="space-y-4">
                {phase3Modules.map((module, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-lg text-gray-900">{module.module_name}</h4>
                          <div className={`px-3 py-1 rounded-full text-sm font-bold ${module.score >= 80 ? 'bg-green-100 text-green-700' : module.score >= 60 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                            {module.score}%
                          </div>
                        </div>
                        {getModuleDescription(module.module_name) && (
                          <p className="text-sm text-gray-600 mb-3">{getModuleDescription(module.module_name)}</p>
                        )}
                        {module.gap_message && (
                          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                            <p className="text-sm text-gray-800 font-medium">{module.gap_message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-primary via-primary to-primary/90 rounded-lg shadow-xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Improve Your Score?
              </h3>
              <p className="text-xl mb-8 text-primary-light">
                Schedule a complimentary 15-minute strategy session to receive a personalized action plan for dominating your local market.
              </p>

              <div className="bg-white rounded-xl p-6 mb-8">
                <CalendarWidget className="text-center" />
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="font-semibold">No Long-Term Contracts</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="font-semibold">2X ROI Guarantee</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="font-semibold">Exclusive Territory</div>
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
