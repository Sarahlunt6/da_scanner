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
    if (score >= 75) return { label: "Strong Performance", color: "text-blue-700", bgColor: "bg-blue-50", borderColor: "border-blue-400" };
    if (score >= 60) return { label: "Opportunity for Growth", color: "text-orange-700", bgColor: "bg-orange-50", borderColor: "border-orange-400" };
    return { label: "Critical Attention Required", color: "text-red-700", bgColor: "bg-red-50", borderColor: "border-red-400" };
  };

  const tier = getScoreTier(scan.overall_score || 0);

  // Group modules by phase
  const phase1Modules = modules?.filter(m => m.module_name.includes("Zone") || m.module_name.includes("Shelf") || m.module_name.includes("Review") || m.module_name.includes("NAP")) || [];
  const phase2Modules = modules?.filter(m => m.module_name.includes("Core 30") || m.module_name.includes("Technical")) || [];
  const phase3Modules = modules?.filter(m => m.module_name.includes("Directory")) || [];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Branded Header */}
        <div className="bg-gradient-to-r from-primary to-primary/95 shadow-lg">
          <div className="container mx-auto px-6 py-8 max-w-6xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-secondary text-sm font-bold tracking-wider mb-2">OPKIE</div>
                <h1 className="text-3xl font-extrabold text-white">Digital Authority Report</h1>
              </div>
              <div className="text-right">
                <div className="text-white/80 text-sm font-medium mb-1">Practice Name</div>
                <div className="text-white font-bold text-xl">{scan.practice_name}</div>
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
              <div className="grid lg:grid-cols-5 gap-8 mb-10">
                {/* Score Display */}
                <div className="lg:col-span-2 flex flex-col items-center justify-center">
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

                {/* Phase Metrics */}
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-sm font-bold text-gray-500 uppercase tracking-wide">Phase 1</div>
                        <div className="text-lg font-bold text-gray-900">Local Foundation</div>
                      </div>
                      <div className="text-3xl font-black text-primary">{scan.phase1_score}%</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-primary/80 h-4 rounded-full transition-all duration-1000"
                        style={{ width: `${scan.phase1_score}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 font-medium">Worth 50% of total score</div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-sm font-bold text-gray-500 uppercase tracking-wide">Phase 2</div>
                        <div className="text-lg font-bold text-gray-900">Digital Assets</div>
                      </div>
                      <div className="text-3xl font-black text-primary">{scan.phase2_score}%</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-primary/80 h-4 rounded-full transition-all duration-1000"
                        style={{ width: `${scan.phase2_score}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 font-medium">Worth 35% of total score</div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-sm font-bold text-gray-500 uppercase tracking-wide">Phase 3</div>
                        <div className="text-lg font-bold text-gray-900">Market Presence</div>
                      </div>
                      <div className="text-3xl font-black text-primary">{scan.phase3_score}%</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-primary/80 h-4 rounded-full transition-all duration-1000"
                        style={{ width: `${scan.phase3_score}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 font-medium">Worth 15% of total score</div>
                  </div>
                </div>
              </div>

              {/* Industry Benchmark */}
              <div className="border-t-2 border-gray-100 pt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">Industry Benchmark</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className={`text-center p-6 rounded-lg border-2 transition-all ${scan.overall_score >= 90 ? 'bg-green-50 border-green-500 shadow-lg transform scale-105' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-4xl font-black text-green-600 mb-2">90+</div>
                    <div className="text-sm font-bold text-gray-900">Elite</div>
                    <div className="text-xs text-gray-600 mt-1">Top 5%</div>
                  </div>
                  <div className={`text-center p-6 rounded-lg border-2 transition-all ${scan.overall_score >= 75 && scan.overall_score < 90 ? 'bg-blue-50 border-blue-500 shadow-lg transform scale-105' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-4xl font-black text-blue-600 mb-2">75-89</div>
                    <div className="text-sm font-bold text-gray-900">Strong</div>
                    <div className="text-xs text-gray-600 mt-1">Top 20%</div>
                  </div>
                  <div className={`text-center p-6 rounded-lg border-2 transition-all ${scan.overall_score >= 60 && scan.overall_score < 75 ? 'bg-orange-50 border-orange-500 shadow-lg transform scale-105' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-4xl font-black text-orange-600 mb-2">60-74</div>
                    <div className="text-sm font-bold text-gray-900">Average</div>
                    <div className="text-xs text-gray-600 mt-1">40%</div>
                  </div>
                  <div className={`text-center p-6 rounded-lg border-2 transition-all ${scan.overall_score < 60 ? 'bg-red-50 border-red-500 shadow-lg transform scale-105' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-4xl font-black text-red-600 mb-2">&lt;60</div>
                    <div className="text-sm font-bold text-gray-900">At Risk</div>
                    <div className="text-xs text-gray-600 mt-1">Bottom 40%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 1 Details */}
          <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-primary to-primary/95 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-secondary text-xs font-bold uppercase tracking-wider mb-1">Phase 1</div>
                  <h3 className="text-2xl font-bold text-white">Local Foundation</h3>
                  <p className="text-white/90 text-sm mt-1">Google Business Profile & Review System</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
                  <div className="text-5xl font-black text-white text-center">{scan.phase1_score}</div>
                  <div className="text-white/90 text-sm font-medium text-center mt-1">Score</div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-5">
                {phase1Modules.map((module, idx) => (
                  <div key={idx} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 hover:border-secondary hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-6 mb-4">
                      <h4 className="font-bold text-xl text-gray-900 flex-1">{module.module_name}</h4>
                      <div className={`px-4 py-2 rounded-lg font-black text-2xl ${module.score >= 80 ? 'bg-green-100 text-green-700' : module.score >= 60 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                        {module.score}%
                      </div>
                    </div>
                    {module.gap_message && (
                      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r">
                        <p className="text-gray-900 font-medium leading-relaxed">{module.gap_message}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Phase 2 Details */}
          <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-primary to-primary/95 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-secondary text-xs font-bold uppercase tracking-wider mb-1">Phase 2</div>
                  <h3 className="text-2xl font-bold text-white">Digital Assets</h3>
                  <p className="text-white/90 text-sm mt-1">Website Authority & Technical Foundation</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
                  <div className="text-5xl font-black text-white text-center">{scan.phase2_score}</div>
                  <div className="text-white/90 text-sm font-medium text-center mt-1">Score</div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-5">
                {phase2Modules.map((module, idx) => (
                  <div key={idx} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 hover:border-secondary hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-6 mb-4">
                      <h4 className="font-bold text-xl text-gray-900 flex-1">{module.module_name}</h4>
                      <div className={`px-4 py-2 rounded-lg font-black text-2xl ${module.score >= 80 ? 'bg-green-100 text-green-700' : module.score >= 60 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                        {module.score}%
                      </div>
                    </div>
                    {module.gap_message && (
                      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r">
                        <p className="text-gray-900 font-medium leading-relaxed">{module.gap_message}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Phase 3 Details */}
          <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-primary to-primary/95 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-secondary text-xs font-bold uppercase tracking-wider mb-1">Phase 3</div>
                  <h3 className="text-2xl font-bold text-white">Market Presence</h3>
                  <p className="text-white/90 text-sm mt-1">Directory Coverage & Review Consistency</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
                  <div className="text-5xl font-black text-white text-center">{scan.phase3_score}</div>
                  <div className="text-white/90 text-sm font-medium text-center mt-1">Score</div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-5">
                {phase3Modules.map((module, idx) => (
                  <div key={idx} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 hover:border-secondary hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-6 mb-4">
                      <h4 className="font-bold text-xl text-gray-900 flex-1">{module.module_name}</h4>
                      <div className={`px-4 py-2 rounded-lg font-black text-2xl ${module.score >= 80 ? 'bg-green-100 text-green-700' : module.score >= 60 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                        {module.score}%
                      </div>
                    </div>
                    {module.gap_message && (
                      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r">
                        <p className="text-gray-900 font-medium leading-relaxed">{module.gap_message}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-primary via-primary to-primary/95 rounded-xl shadow-2xl overflow-hidden border-4 border-secondary">
            <div className="px-8 py-12 text-center">
              <h3 className="text-4xl font-black text-white mb-4">
                Ready to Improve Your Score?
              </h3>
              <p className="text-xl text-white/95 mb-10 max-w-3xl mx-auto font-medium">
                Schedule a complimentary 15-minute strategy session to receive a personalized action plan for dominating your local market.
              </p>

              <div className="bg-white rounded-xl p-8 mb-10 max-w-2xl mx-auto shadow-2xl">
                <CalendarWidget className="text-center" />
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-white font-bold text-lg">No Long-Term Contracts</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-white font-bold text-lg">2X ROI Guarantee</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-white font-bold text-lg">Exclusive Territory</div>
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
