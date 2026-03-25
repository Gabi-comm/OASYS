"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
// 1. Import useRouter
import { useRouter } from 'next/navigation'; 
import LoginModal from './LoginModal';
import { supabase } from '@/utils/supabase';

export default function Navigation() {
  const [showLogin, setShowLogin] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const [user, setUser] = useState<any>(null);
  
  // 2. Initialize the router
  const router = useRouter(); 

  // Navbar scroll logic
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
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // Supabase Auth Listener
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // 3. Update Handle Log Out to redirect!
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/'); // Teleport them back to Home!
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 flex justify-between items-center p-8 transition-all ${ isVisible ? 'translate-y-0' : '-translate-y-full' }`}
        style={{ backgroundColor: isVisible && lastScrollY > 50 ? 'rgba(26, 26, 26, 0.9)' : 'transparent' }}
      >
        {/* Logo/Avatar */}
        <div className="w-12 h-12 bg-gray-300 rounded-full" />

        {/* Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-white hover:text-blue-400 font-bold transition-colors">Home</Link>
          <Link href="/upload-media" className="text-white hover:text-blue-400 font-bold transition-colors">Scan</Link>
          <Link href="/about" className="text-white hover:text-blue-400 font-bold transition-colors">About Us</Link>
          
          {/* This checks if the user is 'admin' */}
          {user?.user_metadata?.role === 'admin' && (
            <Link href="/admin/dashboard" className="text-white hover:text-blue-400 font-bold transition-colors">Admin Dashboard</Link>
          )}
          
          {/* Show Profile/Logout */}
          {user ? (
            <div className="flex items-center gap-4 border-l border-white/20 pl-8 ml-2">
              <span className="text-white font-bold">
                Hi, {user.user_metadata?.username || "Admin"}
              </span>
              <button 
                onClick={handleLogout}
                className="bg-red-500/10 text-white-500 border border-red-500 px-5 py-2 rounded-full font-bold hover:bg-red-500 hover:text-white transition-all"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-3 bg-[#D9D9D9] text-black px-5 py-2 rounded-full font-bold hover:bg-white transition-all ml-4"
            >
              Sign-In
              <span className="w-4 h-4 bg-blue-500 rounded-full" />
            </button>
          )}
        </div>
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}