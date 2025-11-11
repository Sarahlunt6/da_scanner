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
                  className="text-sm text-gray-200 hover:text-[#FFC629] transition-all duration-200 inline-flex items-center gap-2 group relative py-1"
                >
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#FFC629] group-hover:w-full transition-all duration-300 ease-out"></span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Privacy Policy</span>
                  <svg
                    className="w-3 h-3 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-200 hover:text-[#FFC629] transition-all duration-200 inline-flex items-center gap-2 group relative py-1"
                >
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#FFC629] group-hover:w-full transition-all duration-300 ease-out"></span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Terms of Service</span>
                  <svg
                    className="w-3 h-3 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: '#FFC629' }}>Contact</h4>
            <a
              href="mailto:opkie@opkie.com"
              className="text-sm text-gray-200 hover:text-[#FFC629] transition-all duration-200 inline-flex items-center gap-2 group py-2 px-4 -ml-4 rounded-lg hover:bg-white/5"
            >
              <svg
                className="w-5 h-5 transform group-hover:scale-110 transition-all duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="relative">
                opkie@opkie.com
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFC629] group-hover:w-full transition-all duration-300"></span>
              </span>
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
