import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary">Opkie</span>
              <span className="text-xs text-gray-500 ml-2 hidden sm:inline">
                Digital Authority Scanner
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#about" className="text-sm text-gray-600 hover:text-primary transition-colors">
              About TAPS
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
