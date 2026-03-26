"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import LoginModal from './LoginModal';
import { supabase } from '@/utils/supabase';

export default function Navigation() {
  const [showLogin, setShowLogin] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const [user, setUser] = useState<any>(null);
  
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
      
      // 1. Instantly redirect admins when they log in
      if (event === 'SIGNED_IN' && session?.user?.user_metadata?.role === 'admin') {
        router.push('/admin/dashboard');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/'); 
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 flex justify-between items-center p-8 transition-all ${ isVisible ? 'translate-y-0' : '-translate-y-full' }`}
        style={{ backgroundColor: isVisible && lastScrollY > 50 ? 'rgba(26, 26, 26, 0.9)' : 'transparent' }}
      >
        {/* 2. Left Side: Replaced Logo with User Greeting */}
        <div className="flex items-center">
          {user ? (
            <span className="text-white font-black text-xl tracking-wide">
              Hi, <span className="text-blue-400">{user.user_metadata?.username || "Admin"}</span>
            </span>
          ) : (
            // Just an empty placeholder so the flexbox stays balanced when logged out
            <div className="w-12 h-12" /> 
          )}
        </div>

        {/* 3. Right Side: Links and Actions */}
        <div className="flex items-center gap-8">
          
          {/* Dynamic Home Link: Goes to admin dashboard if admin, otherwise normal home */}
          <Link 
            href={user?.user_metadata?.role === 'admin' ? '/admin/dashboard' : '/'} 
            className="text-white hover:text-blue-400 font-bold transition-colors"
          >
            Home
          </Link>

          <Link href="/upload-media" className="text-white hover:text-blue-400 font-bold transition-colors">Scan</Link>
          
          {/* 4. New Report Link */}
          <Link href="/report-damage" className="text-white hover:text-blue-400 font-bold transition-colors">Report</Link>
          
          <Link href="/about" className="text-white hover:text-blue-400 font-bold transition-colors">About Us</Link>
          
          {/* Show Log Out if logged in, otherwise Sign In */}
          {user ? (
            <div className="border-l border-white/20 pl-8 ml-2">
              <button 
                onClick={handleLogout}
                className="bg-red-500/10 text-white border border-red-500 px-5 py-2 rounded-full font-bold hover:bg-red-500 hover:text-white transition-all"
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