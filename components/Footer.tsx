"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#2C5F7C] to-[#1a3a4a] text-white mt-20 relative overflow-hidden">
      {/* Animated background accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC629] opacity-5 rounded-full blur-3xl animate-pulse"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-bold mb-4" style={{ color: '#FFC629' }}>Opkie</h3>
            <p className="text-sm text-gray-200 leading-relaxed">
              Helping dental practices attract high-value patients through the TAPS framework.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: '#FFC629' }}>
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm inline-block py-2 px-3 -ml-3 rounded-lg transition-all duration-200 group"
                  style={{ color: '#FFFFFF' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 198, 41, 0.15)';
                    e.currentTarget.style.color = '#FFC629';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm inline-block py-2 px-3 -ml-3 rounded-lg transition-all duration-200 group"
                  style={{ color: '#FFFFFF' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 198, 41, 0.15)';
                    e.currentTarget.style.color = '#FFC629';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: '#FFC629' }}>Contact</h4>
            <a
              href="mailto:opkie@opkie.com"
              className="text-sm inline-flex items-center gap-2 py-2 px-3 -ml-3 rounded-lg transition-all duration-200"
              style={{ color: '#FFFFFF' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 198, 41, 0.15)';
                e.currentTarget.style.color = '#FFC629';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              opkie@opkie.com
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#3a6f8c] text-center">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} Opkie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
