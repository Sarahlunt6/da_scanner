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
            <div className="bg-white rounded-lg shadow-xl p-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-6"></div>
              <h1 className="text-3xl font-bold text-primary mb-6">
                Your scan is still processing...
              </h1>
              <p className="text-gray-700">
                We're analyzing your practice's digital authority. This usually takes 5-10 minutes.
              </p>
              <p className="text-gray-600 mt-4">
                We'll email you at <span className="font-bold">{scan.email}</span> when
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
    if (score >= 90) return { label: "Elite", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" };
    if (score >= 75) return { label: "Competitive", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" };
    if (score >= 60) return { label: "Needs Work", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" };
    return { label: "Urgent Attention", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
  };

  const getStatusColor = (status: string) => {
    if (status === "excellent") return "text-green-600";
    if (status === "good") return "text-blue-600";
    if (status === "needs_work") return "text-yellow-600";
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
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-12 mb-6 md:mb-8 text-center border border-gray-100">
              <div className="inline-block mb-3 md:mb-4">
                <span className="text-xs font-semibold tracking-wide uppercase text-primary bg-blue-100 px-3 py-1 rounded-full">
                  Digital Authority Report
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                {scan.practice_name}
              </h1>
              <div className="mb-6 md:mb-8">
                <div className="text-6xl md:text-8xl font-extrabold text-primary mb-2 md:mb-3">
                  {scan.overall_score}%
                </div>
                <div className={`text-xl md:text-2xl font-bold ${tier.color} mb-2`}>
                  {tier.label}
                </div>
              </div>

              <div className={`${tier.bg} border ${tier.border} rounded-xl p-4 md:p-6 mb-6 md:mb-8`}>
                <h3 className="font-bold text-gray-800 mb-3 md:mb-4 text-base md:text-lg">
                  How You Compare
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-sm">
                  <div className={scan.overall_score >= 90 ? "font-bold" : ""}>
                    <div className="font-bold text-green-600 text-lg md:text-xl">90%+</div>
                    <div className="text-gray-600 mt-1 text-xs md:text-sm">Top 5%</div>
                    <div className="text-xs text-gray-500">Elite</div>
                  </div>
                  <div className={scan.overall_score >= 75 && scan.overall_score < 90 ? "font-bold" : ""}>
                    <div className="font-bold text-blue-600 text-lg md:text-xl">75-89%</div>
                    <div className="text-gray-600 mt-1 text-xs md:text-sm">15% of practices</div>
                    <div className="text-xs text-gray-500">Competitive</div>
                  </div>
                  <div className={scan.overall_score >= 60 && scan.overall_score < 75 ? "font-bold" : ""}>
                    <div className="font-bold text-yellow-600 text-lg md:text-xl">60-74%</div>
                    <div className="text-gray-600 mt-1 text-xs md:text-sm">40% of practices</div>
                    <div className="text-xs text-gray-500">Average</div>
                  </div>
                  <div className={scan.overall_score < 60 ? "font-bold" : ""}>
                    <div className="font-bold text-red-600 text-lg md:text-xl">&lt;60%</div>
                    <div className="text-gray-600 mt-1 text-xs md:text-sm">40% of practices</div>
                    <div className="text-xs text-gray-500">Needs Help</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-8">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                  Book Your Free Strategy Call
                </h3>
                <CalendarWidget className="text-center" />
              </div>
            </div>

            {/* Phase Breakdown */}
            <div className="space-y-4 md:space-y-6">
              {/* Phase 1 */}
              <div className="bg-white rounded-2xl shadow-xl p-5 md:p-8 border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6">
                  <div className="mb-3 md:mb-0">
                    <h2 className="text-xl md:text-3xl font-bold text-primary">Phase 1: The Foundational Sprint</h2>
                    <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">Your Google Business Profile and review system</p>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="text-4xl md:text-5xl font-bold text-primary">{scan.phase1_score}%</div>
                    <div className="text-xs md:text-sm text-gray-500 mt-1">50% of total score</div>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  {phase1Modules.map((module, idx) => (
                    <div key={idx} className="border-l-4 border-gray-200 pl-3 md:pl-4 py-2">
                      <div className="flex items-start md:items-center justify-between mb-2 gap-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm md:text-base">{module.module_name}</h3>
                          {getModuleDescription(module.module_name) && (
                            <p className="text-xs text-gray-500 mt-1">{getModuleDescription(module.module_name)}</p>
                          )}
                        </div>
                        <span className={`text-xl md:text-2xl font-bold ${getStatusColor(module.status)} flex-shrink-0`}>
                          {module.score}%
                        </span>
                      </div>
                      {module.gap_message && (
                        <p className="text-xs md:text-sm text-gray-700 bg-gray-50 p-2 md:p-3 rounded-lg mt-2">
                          {module.gap_message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Phase 2 */}
              <div className="bg-white rounded-2xl shadow-xl p-5 md:p-8 border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6">
                  <div className="mb-3 md:mb-0">
                    <h2 className="text-xl md:text-3xl font-bold text-primary">Phase 2: The Asset Engine</h2>
                    <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">Your website authority and technical trust signals</p>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="text-4xl md:text-5xl font-bold text-primary">{scan.phase2_score}%</div>
                    <div className="text-xs md:text-sm text-gray-500 mt-1">35% of total score</div>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  {phase2Modules.map((module, idx) => (
                    <div key={idx} className="border-l-4 border-gray-200 pl-3 md:pl-4 py-2">
                      <div className="flex items-start md:items-center justify-between mb-2 gap-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm md:text-base">{module.module_name}</h3>
                          {getModuleDescription(module.module_name) && (
                            <p className="text-xs text-gray-500 mt-1">{getModuleDescription(module.module_name)}</p>
                          )}
                        </div>
                        <span className={`text-xl md:text-2xl font-bold ${getStatusColor(module.status)} flex-shrink-0`}>
                          {module.score}%
                        </span>
                      </div>
                      {module.gap_message && (
                        <p className="text-xs md:text-sm text-gray-700 bg-gray-50 p-2 md:p-3 rounded-lg mt-2">
                          {module.gap_message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Phase 3 */}
              <div className="bg-white rounded-2xl shadow-xl p-5 md:p-8 border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6">
                  <div className="mb-3 md:mb-0">
                    <h2 className="text-xl md:text-3xl font-bold text-primary">Phase 3: The Long-Term Moat</h2>
                    <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">Your directory presence and consistent review system</p>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="text-4xl md:text-5xl font-bold text-primary">{scan.phase3_score}%</div>
                    <div className="text-xs md:text-sm text-gray-500 mt-1">15% of total score</div>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  {phase3Modules.map((module, idx) => (
                    <div key={idx} className="border-l-4 border-gray-200 pl-3 md:pl-4 py-2">
                      <div className="flex items-start md:items-center justify-between mb-2 gap-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm md:text-base">{module.module_name}</h3>
                          {getModuleDescription(module.module_name) && (
                            <p className="text-xs text-gray-500 mt-1">{getModuleDescription(module.module_name)}</p>
                          )}
                        </div>
                        <span className={`text-xl md:text-2xl font-bold ${getStatusColor(module.status)} flex-shrink-0`}>
                          {module.score}%
                        </span>
                      </div>
                      {module.gap_message && (
                        <p className="text-xs md:text-sm text-gray-700 bg-gray-50 p-2 md:p-3 rounded-lg mt-2">
                          {module.gap_message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12 mt-6 md:mt-8 border border-gray-100">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4 text-center">
                Ready to Fix These Gaps?
              </h3>
              <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto text-center">
                Book a 15-minute TAPS Strategy Call to get your personalized action plan and learn how the top 5% of practices dominate their markets.
              </p>
              <CalendarWidget className="text-center" />
              <div className="mt-6 md:mt-8 flex flex-col md:flex-row items-center justify-center md:space-x-8 space-y-3 md:space-y-0 text-xs md:text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No long-term contracts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>2X ROI guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Exclusive territory</span>
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
