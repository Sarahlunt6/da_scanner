import Footer from "@/components/Footer";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Link href="/" className="text-primary hover:underline mb-6 inline-block">
            ← Back to Scanner
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Effective Date:</strong> November 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 mb-4">
                Opkie ("we," "our," or "us") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Digital Authority Scanner tool.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                When you use the Digital Authority Scanner, we collect:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Practice Information:</strong> Practice name, website URL</li>
                <li><strong>Contact Information:</strong> Email address, phone number, contact name</li>
                <li><strong>Publicly Available Data:</strong> Information from your Google Business Profile, website, and online directories</li>
                <li><strong>Analytics Data:</strong> Usage patterns, page views, and interactions with our tool</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Analyze your practice's digital authority and generate your score</li>
                <li>Send you scan results and follow-up communications</li>
                <li>Provide customer support and respond to your inquiries</li>
                <li>Improve our service and develop new features</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Service Providers:</strong> Third-party vendors who help us operate our service (email providers, analytics tools)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                Our tool uses the following third-party services:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Google PageSpeed API</li>
                <li>Yelp Fusion API</li>
                <li>Vercel Postgres (database hosting)</li>
                <li>Vercel (hosting)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to collect usage data and improve our service. You can disable cookies in your browser settings, but some features may not function properly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your scan results indefinitely to allow you to access them in the future. You may request deletion of your data by contacting us at opkie@opkie.com.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">HIPAA Compliance</h2>
              <p className="text-gray-700 mb-4">
                Our tool does not collect protected health information (PHI) as defined by HIPAA. We only collect practice information and publicly available data. We are HIPAA-aware and designed for use by healthcare practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-700 mb-4">
                Depending on your location, you may have rights to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                For privacy-related questions or requests, contact us at:
              </p>
              <p className="text-gray-700">
                Email: <a href="mailto:opkie@opkie.com" className="text-primary hover:underline">opkie@opkie.com</a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
