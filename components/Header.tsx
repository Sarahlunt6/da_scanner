import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/opkie-logo.png"
              alt="Opkie"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
            <div className="hidden sm:block border-l border-gray-300 pl-3">
              <span className="text-sm font-medium text-gray-600">
                Digital Authority Scanner
              </span>
            </div>
          </Link>

          <nav className="flex items-center space-x-6">
            <a href="#how-it-works" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors hidden md:inline">
              How It Works
            </a>
            <a href="#about-taps" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors hidden md:inline">
              About TAPS
            </a>
            <a
              href="https://opkie.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-primary hover:text-secondary transition-colors"
            >
              Visit Opkie.com
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
