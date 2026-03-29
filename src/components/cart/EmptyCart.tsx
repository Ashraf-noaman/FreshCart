import Link from "next/link";
import { useState } from "react";

const categories = ["Electronics", "Fashion", "Home", "Beauty"];

const EmptyCartPage = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar placeholder */}
    

      {/* Breadcrumb */}
      <div className="px-8 py-3 text-sm text-gray-500">
        <Link href="/" className="hover:text-green-600 cursor-pointer transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">Cart</span>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        {/* Icon Container */}
        <div className="relative mb-8">
          <div className="w-36 h-36 rounded-full bg-gray-100 flex items-center justify-center shadow-inner">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <svg
                className="w-14 h-14 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
                />
              </svg>
            </div>
          </div>
          {/* Floating sparkles */}
          <div className="absolute top-2 right-0 w-3 h-3 bg-green-300 rounded-full opacity-60 animate-bounce" style={{ animationDelay: "0.2s" }} />
          <div className="absolute bottom-4 left-0 w-2 h-2 bg-green-400 rounded-full opacity-50 animate-bounce" style={{ animationDelay: "0.5s" }} />
        </div>

        {/* Text */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          Your cart is empty
        </h1>
        <p className="text-gray-500 text-center text-base max-w-xs leading-relaxed mb-10">
          Looks like you have not added anything to your cart yet.
          <br />
          Start exploring our products!
        </p>

        {/* CTA Button */}
        <Link href="/products" className="cursor-pointer group flex items-center gap-3 bg-green-600 hover:bg-green-700 active:scale-95 text-white font-semibold text-base px-8 py-4 rounded-xl shadow-lg shadow-green-200 transition-all duration-200">
          Start Shopping
          <span className="group-hover:translate-x-1 transition-transform duration-200 text-lg">→</span>
        </Link>

        {/* Divider */}
        <div className="mt-16 mb-6 flex items-center gap-4 w-full max-w-md">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400 font-medium whitespace-nowrap">Popular Categories</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3">
            <Link href="/categories" className="px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 bg-white text-gray-700 border-gray-200 hover:border-green-400">
              All Categories
            </Link>
            <Link href="/categories/6439d5b90049ad0b52b90048" className="px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 bg-white text-gray-700 border-gray-200 hover:border-green-400">
              Men Fashion
            </Link>
            <Link href="/categories/6439d58a0049ad0b52b9003f" className="px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 bg-white text-gray-700 border-gray-200 hover:border-green-400">
              Women Fashion
            </Link>
            <Link href="/categories/6439d2d167d9aa4ca970649f" className="px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 bg-white text-gray-700 border-gray-200 hover:border-green-400">
              Electronics
            </Link>
            
        </div>
      </main>
    </div>
  );
};

export default EmptyCartPage;
