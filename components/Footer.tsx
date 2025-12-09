"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#1e2a5e] to-[#0f1733] text-white mt-20 relative overflow-hidden">
      {/* Animated background accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-10 rounded-full blur-3xl animate-pulse"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-bold mb-4 text-white">HR4Sight</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              The all-in-one source for current HR and employment laws, helping you stay compliant and reduce employer risk.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm inline-block py-2 px-3 -ml-3 rounded-lg transition-all duration-200 group text-gray-300 hover:text-secondary hover:bg-white/5"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm inline-block py-2 px-3 -ml-3 rounded-lg transition-all duration-200 group text-gray-300 hover:text-secondary hover:bg-white/5"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white uppercase tracking-wider">Contact</h4>
            <a
              href="mailto:support@hr4sight.com"
              className="text-sm inline-flex items-center gap-2 py-2 px-3 -ml-3 rounded-lg transition-all duration-200 text-gray-300 hover:text-secondary hover:bg-white/5"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@hr4sight.com
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} HR4Sight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
