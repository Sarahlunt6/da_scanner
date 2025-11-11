import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#2C5F7C] to-[#1a3a4a] text-white mt-20 relative overflow-hidden">
      {/* Animated background accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC629] opacity-5 rounded-full blur-3xl animate-pulse"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative group">
                <Image
                  src="/opkie-logo.png"
                  alt="Opkie Logo"
                  width={40}
                  height={40}
                  className="rounded-lg transition-transform duration-300 group-hover:rotate-12"
                />
                <div className="absolute inset-0 bg-[#FFC629] opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-bold hover:tracking-wider transition-all duration-300" style={{ color: '#FFC629' }}>Opkie</h3>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed">
              Helping dental practices attract high-value patients through the TAPS framework.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 inline-block relative" style={{ color: '#FFC629' }}>
              Legal
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFC629] transition-all duration-300 group-hover:w-full"></span>
            </h4>
            <ul className="space-y-2">
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link href="/privacy" className="text-sm text-gray-200 hover:text-[#FFC629] transition-colors duration-300 inline-flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#FFC629] transition-all duration-300"></span>
                  Privacy Policy
                </Link>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link href="/terms" className="text-sm text-gray-200 hover:text-[#FFC629] transition-colors duration-300 inline-flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#FFC629] transition-all duration-300"></span>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: '#FFC629' }}>Contact</h4>
            <p className="text-sm text-gray-200">
              <a
                href="mailto:opkie@opkie.com"
                className="hover:text-[#FFC629] transition-all duration-300 inline-flex items-center gap-2 group relative"
              >
                <span className="relative">
                  opkie@opkie.com
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFC629] group-hover:w-full transition-all duration-300"></span>
                </span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#3a6f8c] text-center">
          <p className="text-sm text-gray-300 animate-pulse">
            © {new Date().getFullYear()} Opkie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
