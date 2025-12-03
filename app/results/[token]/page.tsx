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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-200">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-secondary"></div>
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              </div>
              <h1 className="text-3xl font-extrabold text-primary mb-6">
                Your scan is still processing...
              </h1>
              <p className="text-gray-700 text-lg">
                We're analyzing your practice's digital authority. This usually takes 5-10 minutes.
              </p>
              <p className="text-gray-600 mt-4">
                We'll email you at <span className="font-bold text-primary">{scan.email}</span> when
                your results are ready.
              </p>
              <p className="text-sm text-gray-500 mt-6">
                Refresh this page to check for updates.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const getScoreTier = (score: number) => {
    if (score >= 90) return { label: "Elite", color: "text-green-600", bg: "bg-green-50", border: "border-green-300" };
    if (score >= 75) return { label: "Competitive", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-300" };
    if (score >= 60) return { label: "Needs Work", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-300" };
    return { label: "Urgent Attention", color: "text-red-600", bg: "bg-red-50", border: "border-red-300" };
  };

  const getStatusColor = (status: string) => {
    if (status === "excellent") return "text-green-600";
    if (status === "good") return "text-blue-600";
    if (status === "needs_work") return "text-orange-600";
    return "text-red-600";
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12 mb-6 md:mb-8 text-center border-2 border-secondary relative overflow-hidden">
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-primary via-secondary to-primary"></div>

              <div className="inline-block mb-4 md:mb-6">
                <span className="text-sm font-bold tracking-wide uppercase text-white bg-primary px-6 py-2.5 rounded-full shadow-lg">
                  Digital Authority Report
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-6 md:mb-8">
                {scan.practice_name}
              </h1>

              {/* Circular score */}
              <div className="mb-8 md:mb-10 relative">
                <div className={`inline-flex items-center justify-center w-56 h-56 md:w-64 md:h-64 rounded-full ${tier.bg} border-8 ${tier.border} shadow-xl mx-auto`}>
                  <div className="text-center">
                    <div className="text-7xl md:text-8xl font-extrabold text-primary leading-none">
                      {scan.overall_score}
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-primary/70 mt-1">%</div>
                  </div>
                </div>
                <div className={`text-3xl md:text-4xl font-extrabold ${tier.color} mt-6`}>
                  {tier.label}
                </div>
              </div>

              {/* Comparison section */}
              <div className={`${tier.bg} border-2 ${tier.border} rounded-2xl p-6 md:p-8 mb-8`}>
                <h3 className="font-bold text-gray-900 mb-5 md:mb-6 text-lg md:text-xl">
                  How You Compare to Other Practices
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  <div className={`p-4 rounded-xl border-2 transition-all ${scan.overall_score >= 90 ? "bg-white border-green-500 shadow-lg scale-105" : "bg-white border-gray-200"}`}>
                    <div className="font-extrabold text-green-600 text-2xl md:text-3xl mb-1">90%+</div>
                    <div className="text-gray-700 font-semibold text-sm md:text-base">Top 5%</div>
                    <div className="text-xs md:text-sm text-gray-500 mt-1">Elite</div>
                  </div>
                  <div className={`p-4 rounded-xl border-2 transition-all ${scan.overall_score >= 75 && scan.overall_score < 90 ? "bg-white border-blue-500 shadow-lg scale-105" : "bg-white border-gray-200"}`}>
                    <div className="font-extrabold text-blue-600 text-2xl md:text-3xl mb-1">75-89%</div>
                    <div className="text-gray-700 font-semibold text-sm md:text-base">Top 20%</div>
                    <div className="text-xs md:text-sm text-gray-500 mt-1">Competitive</div>
                  </div>
                  <div className={`p-4 rounded-xl border-2 transition-all ${scan.overall_score >= 60 && scan.overall_score < 75 ? "bg-white border-orange-500 shadow-lg scale-105" : "bg-white border-gray-200"}`}>
                    <div className="font-extrabold text-orange-600 text-2xl md:text-3xl mb-1">60-74%</div>
                    <div className="text-gray-700 font-semibold text-sm md:text-base">40%</div>
                    <div className="text-xs md:text-sm text-gray-500 mt-1">Average</div>
                  </div>
                  <div className={`p-4 rounded-xl border-2 transition-all ${scan.overall_score < 60 ? "bg-white border-red-500 shadow-lg scale-105" : "bg-white border-gray-200"}`}>
                    <div className="font-extrabold text-red-600 text-2xl md:text-3xl mb-1">&lt;60%</div>
                    <div className="text-gray-700 font-semibold text-sm md:text-base">Bottom 40%</div>
                    <div className="text-xs md:text-sm text-gray-500 mt-1">Needs Help</div>
                  </div>
                </div>
              </div>

              {/* CTA section */}
              <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl p-6 md:p-8 border-2 border-secondary/50">
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
                  Book Your Free Strategy Call
                </h3>
                <p className="text-gray-700 mb-6 text-base">
                  Discover exactly how to close these gaps and dominate your local market
                </p>
                <CalendarWidget className="text-center" />
              </div>
            </div>

            {/* Phase Breakdown */}
            <div className="space-y-6">
              {/* Phase 1 */}
              <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border-l-8 border-secondary">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
                  <div className="mb-4 md:mb-0">
                    <div className="inline-block mb-3">
                      <span className="text-xs font-bold tracking-wider uppercase text-white bg-primary px-4 py-1.5 rounded-full">
                        Phase 1
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-extrabold text-primary">
                      The Foundational Sprint
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 mt-2">Your Google Business Profile and review system</p>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-white to-gray-50 border-4 border-primary shadow-lg">
                      <div className="text-center">
                        <div className="text-4xl md:text-5xl font-extrabold text-primary">{scan.phase1_score}</div>
                        <div className="text-lg md:text-xl font-bold text-primary/70">%</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-3 font-semibold">50% of total score</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {phase1Modules.map((module, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-secondary hover:shadow-md transition-all p-4 md:p-5">
                      <div className="flex items-start md:items-center justify-between mb-3 gap-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-base md:text-lg">{module.module_name}</h3>
                          {getModuleDescription(module.module_name) && (
                            <p className="text-sm text-gray-600 mt-2">{getModuleDescription(module.module_name)}</p>
                          )}
                        </div>
                        <div className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl border-4 ${module.score >= 80 ? 'bg-green-50 border-green-500' : module.score >= 60 ? 'bg-orange-50 border-orange-500' : 'bg-red-50 border-red-500'} flex items-center justify-center shadow-md`}>
                          <span className={`text-2xl md:text-3xl font-extrabold ${getStatusColor(module.status)}`}>
                            {module.score}
                          </span>
                        </div>
                      </div>
                      {module.gap_message && (
                        <div className="bg-white p-4 rounded-lg mt-3 border-l-4 border-primary">
                          <p className="text-sm md:text-base text-gray-700">
                            {module.gap_message}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Phase 2 */}
              <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border-l-8 border-secondary">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
                  <div className="mb-4 md:mb-0">
                    <div className="inline-block mb-3">
                      <span className="text-xs font-bold tracking-wider uppercase text-white bg-primary px-4 py-1.5 rounded-full">
                        Phase 2
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-extrabold text-primary">
                      The Asset Engine
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 mt-2">Your website authority and technical trust signals</p>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-white to-gray-50 border-4 border-primary shadow-lg">
                      <div className="text-center">
                        <div className="text-4xl md:text-5xl font-extrabold text-primary">{scan.phase2_score}</div>
                        <div className="text-lg md:text-xl font-bold text-primary/70">%</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-3 font-semibold">35% of total score</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {phase2Modules.map((module, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-secondary hover:shadow-md transition-all p-4 md:p-5">
                      <div className="flex items-start md:items-center justify-between mb-3 gap-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-base md:text-lg">{module.module_name}</h3>
                          {getModuleDescription(module.module_name) && (
                            <p className="text-sm text-gray-600 mt-2">{getModuleDescription(module.module_name)}</p>
                          )}
                        </div>
                        <div className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl border-4 ${module.score >= 80 ? 'bg-green-50 border-green-500' : module.score >= 60 ? 'bg-orange-50 border-orange-500' : 'bg-red-50 border-red-500'} flex items-center justify-center shadow-md`}>
                          <span className={`text-2xl md:text-3xl font-extrabold ${getStatusColor(module.status)}`}>
                            {module.score}
                          </span>
                        </div>
                      </div>
                      {module.gap_message && (
                        <div className="bg-white p-4 rounded-lg mt-3 border-l-4 border-primary">
                          <p className="text-sm md:text-base text-gray-700">
                            {module.gap_message}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Phase 3 */}
              <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border-l-8 border-secondary">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
                  <div className="mb-4 md:mb-0">
                    <div className="inline-block mb-3">
                      <span className="text-xs font-bold tracking-wider uppercase text-white bg-primary px-4 py-1.5 rounded-full">
                        Phase 3
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-extrabold text-primary">
                      The Long-Term Moat
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 mt-2">Your directory presence and consistent review system</p>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-white to-gray-50 border-4 border-primary shadow-lg">
                      <div className="text-center">
                        <div className="text-4xl md:text-5xl font-extrabold text-primary">{scan.phase3_score}</div>
                        <div className="text-lg md:text-xl font-bold text-primary/70">%</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-3 font-semibold">15% of total score</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {phase3Modules.map((module, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-secondary hover:shadow-md transition-all p-4 md:p-5">
                      <div className="flex items-start md:items-center justify-between mb-3 gap-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-base md:text-lg">{module.module_name}</h3>
                          {getModuleDescription(module.module_name) && (
                            <p className="text-sm text-gray-600 mt-2">{getModuleDescription(module.module_name)}</p>
                          )}
                        </div>
                        <div className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl border-4 ${module.score >= 80 ? 'bg-green-50 border-green-500' : module.score >= 60 ? 'bg-orange-50 border-orange-500' : 'bg-red-50 border-red-500'} flex items-center justify-center shadow-md`}>
                          <span className={`text-2xl md:text-3xl font-extrabold ${getStatusColor(module.status)}`}>
                            {module.score}
                          </span>
                        </div>
                      </div>
                      {module.gap_message && (
                        <div className="bg-white p-4 rounded-lg mt-3 border-l-4 border-primary">
                          <p className="text-sm md:text-base text-gray-700">
                            {module.gap_message}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="bg-gradient-to-br from-primary to-primary/90 rounded-3xl shadow-2xl p-8 md:p-12 mt-8 border-2 border-secondary relative overflow-hidden">
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/30 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 text-center">
                  Ready to Fix These Gaps?
                </h3>
                <p className="text-lg md:text-xl text-white mb-8 max-w-3xl mx-auto text-center">
                  Book a 15-minute TAPS Strategy Call to get your personalized action plan and learn how the top 5% of practices dominate their markets.
                </p>
                <div className="bg-white rounded-2xl p-6 shadow-xl mb-8">
                  <CalendarWidget className="text-center" />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center md:space-x-12 space-y-4 md:space-y-0 text-base text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold">No long-term contracts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold">2X ROI guarantee</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold">Exclusive territory</span>
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
