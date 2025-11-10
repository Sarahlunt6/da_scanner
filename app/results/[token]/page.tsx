import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

interface ResultsPageProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  const { token } = await params;

  // Fetch scan results from database
  const { data: scan, error } = await supabase
    .from("scans")
    .select("*")
    .eq("unique_token", token)
    .single();

  if (error || !scan) {
    notFound();
  }

  // If scan is still processing, show processing message
  if (scan.status === "processing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-xl p-12">
            <h1 className="text-3xl font-bold text-primary mb-6">
              Your scan is still processing...
            </h1>
            <p className="text-gray-700">
              We'll email you at <span className="font-bold">{scan.email}</span> when
              your results are ready.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getScoreTier = (score: number) => {
    if (score >= 90) return { label: "Elite", color: "text-green-600" };
    if (score >= 75) return { label: "Competitive", color: "text-blue-600" };
    if (score >= 60) return { label: "Needs Work", color: "text-yellow-600" };
    return { label: "Urgent Attention", color: "text-red-600" };
  };

  const tier = getScoreTier(scan.overall_score || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {scan.practice_name}
            </h1>
            <div className="mb-6">
              <div className="text-6xl font-bold text-primary mb-2">
                {scan.overall_score}%
              </div>
              <div className={`text-xl font-semibold ${tier.color}`}>
                {tier.label}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">
                How practices score:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-bold text-green-600">90%+</div>
                  <div className="text-gray-600">Top 5%</div>
                </div>
                <div>
                  <div className="font-bold text-blue-600">75-89%</div>
                  <div className="text-gray-600">Competitive</div>
                </div>
                <div>
                  <div className="font-bold text-yellow-600">60-74%</div>
                  <div className="text-gray-600">Average</div>
                </div>
                <div>
                  <div className="font-bold text-red-600">&lt;60%</div>
                  <div className="text-gray-600">Needs Help</div>
                </div>
              </div>
            </div>

            <button className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-lg transition-colors w-full md:w-auto">
              Book Your Free TAPS Strategy Call
            </button>
          </div>

          {/* TAPS Framework Breakdown */}
          <div className="space-y-6">
            {/* Phase 1 */}
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Phase 1: The Foundational Sprint
              </h2>
              <div className="text-3xl font-bold mb-4">{scan.phase1_score}%</div>
              <p className="text-gray-600 mb-6">
                Your Google Business Profile setup and review system
              </p>
              <div className="text-sm text-gray-500">
                Detailed module breakdown coming soon...
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Phase 2: The Asset Engine
              </h2>
              <div className="text-3xl font-bold mb-4">{scan.phase2_score}%</div>
              <p className="text-gray-600 mb-6">
                Your website authority and technical trust signals
              </p>
              <div className="text-sm text-gray-500">
                Detailed module breakdown coming soon...
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Phase 3: The Long-Term Moat
              </h2>
              <div className="text-3xl font-bold mb-4">{scan.phase3_score}%</div>
              <p className="text-gray-600 mb-6">
                Your directory presence and consistent review system
              </p>
              <div className="text-sm text-gray-500">
                Detailed module breakdown coming soon...
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="bg-white rounded-lg shadow-xl p-8 mt-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Fix These Gaps?
            </h3>
            <p className="text-gray-600 mb-6">
              Book a 15-minute TAPS Strategy Call to get your personalized action plan
            </p>
            <button className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-lg transition-colors">
              Book Your Strategy Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
