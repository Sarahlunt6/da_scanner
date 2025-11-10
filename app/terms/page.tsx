import Footer from "@/components/Footer";
import Link from "next/link";

export default function TermsPage() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Link href="/" className="text-primary hover:underline mb-6 inline-block">
            ← Back to Scanner
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Effective Date:</strong> November 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By using the Opkie Digital Authority Scanner ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                The Digital Authority Scanner is a diagnostic tool that analyzes your dental practice's online presence and generates a Digital Authority Score based on publicly available data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Use of Service</h2>
              <p className="text-gray-700 mb-4">
                You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Provide accurate and complete information</li>
                <li>Use the Service only for lawful purposes</li>
                <li>Not submit fraudulent or misleading information</li>
                <li>Not attempt to disrupt or interfere with the Service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Disclaimer of Accuracy</h2>
              <p className="text-gray-700 mb-4">
                The scores and analysis provided by the Digital Authority Scanner are estimates based on publicly available data and may not reflect real-time changes to your online presence. This tool is for informational purposes only.
              </p>
              <p className="text-gray-700 mb-4">
                We do not guarantee:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>The accuracy or completeness of the analysis</li>
                <li>Specific marketing results or outcomes</li>
                <li>That the information is error-free or up-to-date</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                The TAPS (Trusted Authority Profile System) framework, Digital Authority Scanner, and all related materials are proprietary to Opkie. You may not copy, reproduce, or distribute any part of the Service without our written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                To the fullest extent permitted by law, Opkie shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. No Guarantees</h2>
              <p className="text-gray-700 mb-4">
                While we strive to provide accurate analysis, we make no guarantees about:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Increased patient volume or revenue</li>
                <li>Improved search rankings</li>
                <li>Specific marketing outcomes</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Results from implementing TAPS recommendations may vary based on market conditions, competition, and other factors outside our control.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Right to Refuse Service</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to refuse service, terminate accounts, or remove content at our sole discretion, without notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Data Usage</h2>
              <p className="text-gray-700 mb-4">
                By using the Service, you consent to our collection and use of your data as described in our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                Our Service relies on third-party APIs and services (Google, Yelp, etc.). We are not responsible for their availability, accuracy, or performance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms of Service at any time. Continued use of the Service after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions about these Terms of Service, contact us at:
              </p>
              <p className="text-gray-700">
                Email: <a href="mailto:opkie@opkie.com" className="text-primary hover:underline">opkie@opkie.com</a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Severability</h2>
              <p className="text-gray-700 mb-4">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
