"use client";
import { useState, useEffect } from "react";
import "./globals.css";
import Link from "next/link";
import LoginModal from "@/components/LoginModal";
// 1. Add the usePathname import
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 2. Get the current URL
  const pathname = usePathname();
  
  // 3. Check if we are on the detailed report screen
  const isDetailedPage = pathname.includes("/admin/reports/") && pathname !== "/admin/reports";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <html lang="en">
      <body className="bg-dark-bg text-white">
        
        {/* 4. ONLY render the <nav> if we are NOT on the detailed page! */}
        {!isDetailedPage && (
          <nav
            className={`fixed top-0 w-full z-50 flex justify-between items-center p-8 transition-all ${
              isVisible ? "nav-visible" : "nav-hidden"
            }`}
          >
            <div className="w-12 h-12 bg-gray-400 rounded-full" /> {/* Logo */}
            <div className="flex items-center gap-12 font-semibold">
              <Link href="/" className="hover:text-blue-500 transition-colors">
                Home
              </Link>
              <Link
                href="/upload-media"
                className="hover:text-blue-500 transition-colors"
              >
                Scan
              </Link>
              <Link
                href="/about"
                className="hover:text-blue-500 transition-colors"
              >
                About Us
              </Link>

              <button
                onClick={() => setLoginOpen(true)}
                className="bg-[#D9D9D9] text-black px-6 py-2 rounded-full flex items-center gap-2 font-bold hover:bg-white transition-all"
              >
                Sign-In <span className="w-4 h-4 bg-blue-500 rounded-full" />
              </button>
            </div>
          </nav>
        )}

        {children}

        {isLoginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
      </body>
    </html>
  );
}