"use client";
import { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import { supabase } from '@/utils/supabase';

export default function Navigation() {
  const [showLogin, setShowLogin] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // 2. Add a state to store the logged-in user
  const [user, setUser] = useState<any>(null);

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

  // 3. Supabase Auth Listener
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

  // 4. Handle Log Out
  const handleLogout = async () => {
    await supabase.auth.signOut();
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
          <button className="text-white hover:text-blue-400 font-bold transition-colors">Home</button>
          <button className="text-white hover:text-blue-400 font-bold transition-colors">Scan</button>
          <button className="text-white hover:text-blue-400 font-bold transition-colors">About Us</button>
          
          {/* 5. Conditional Rendering: Show Profile/Logout if logged in, else show Sign-In */}
          {user ? (
            <div className="flex items-center gap-4">
              {/* Extract the username we saved earlier! */}
              <span className="text-white font-bold">
                Hi, {user.user_metadata?.username || "User"}
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
              className="flex items-center gap-3 bg-[#D9D9D9] text-black px-5 py-2 rounded-full font-bold hover:bg-white transition-all"
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