"use client";
import { useState, useEffect } from 'react';
import LoginModal from './LoginModal';

export default function Navigation() {
  const [showLogin, setShowLogin] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    
    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 flex justify-between items-center p-8 ${ isVisible ? 'nav-visible' : 'nav-hidden' }`}
        style={{ backgroundColor: isVisible ? 'transparent' : 'rgba(26, 26, 26, 0.9)' }}
      >
        {/* Logo/Avatar */}
        <div className="w-12 h-12 bg-gray-300 rounded-full" />

        {/* Links */}
        <div className="flex items-center gap-8">
          <button className="text-white hover:text-blue-400 font-bold">Home</button>
          <button className="text-white hover:text-blue-400 font-bold">Scan</button>
          <button className="text-white hover:text-blue-400 font-bold">About Us</button>
          
          <button 
            onClick={() => setShowLogin(true)}
            className="flex items-center gap-3 bg-[#D9D9D9] text-black px-5 py-2 rounded-full font-bold hover:bg-white transition-all"
          >
            Sign-In
            <span className="w-4 h-4 bg-blue-500 rounded-full" />
          </button>
        </div>
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}