import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/hr4sight-logo.png"
              alt="HR4Sight"
              width={200}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>

          <nav className="flex items-center space-x-6">
            <a href="#how-it-works" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors hidden md:inline">
              How It Works
            </a>
            <a href="#about-taps" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors hidden md:inline">
              About TAPS
            </a>
            <a
              href="https://hr4sight.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-primary hover:text-secondary transition-colors"
            >
              Visit HR4Sight.com
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
