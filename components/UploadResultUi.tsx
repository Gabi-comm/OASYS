'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase'; 
// 1. Import your LoginModal (Adjust the path if your component is in a different folder!)
import LoginModal from './LoginModal'; 

export default function UploadResultUi({ backLinkHref }: { backLinkHref: string }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // 2. Add state to control the modal
  const [showLogin, setShowLogin] = useState(false); 

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsSignedIn(!!session);
      setIsLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsSignedIn(!!session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="pt-32 px-10 min-h-screen bg-[#121212]">
        <div className="bg-[#1e1e1e] rounded-[40px] p-12 border border-white/5 shadow-2xl relative max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <p className="text-blue-500 font-bold mb-1 uppercase tracking-widest text-sm">Analyze Results</p>
              <h1 className="text-6xl font-black text-white">Road Damage Report</h1>
            </div>

            <Link 
              href={backLinkHref} 
              className="p-2 rounded-full hover:bg-white/10 transition-all text-white group"
              title="Go Back"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" width="32" height="32" 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className="group-hover:-translate-x-1 transition-transform"
              >
                <path d="M19 12H5"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Detected Image/Video Card */}
            <div className="bg-[#D9D9D9] rounded-[30px] p-6 text-black flex flex-col">
              <div className="bg-zinc-800 rounded-2xl w-full h-64 mb-6 flex items-center justify-center overflow-hidden">
                 <p className="text-white/50 italic text-sm text-center px-4">Detected Damage Preview</p>
              </div>
              <h2 className="text-2xl font-black mb-2">Road_Scan_001.mp4</h2>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-black/10 pb-1">
                  <span className="font-bold">Damage Type:</span>
                  <span>Longitudinal Crack</span>
                </div>
                <div className="flex justify-between border-b border-black/10 pb-1">
                  <span className="font-bold">Confidence:</span>
                  <span className="text-blue-700 font-black">94.2%</span>
                </div>
              </div>
            </div>

            {/* AI Insights / Details */}
            <div className="bg-[#D9D9D9] rounded-[30px] p-8 text-black">
              <h2 className="text-3xl font-black mb-6 uppercase">Detection Details</h2>
              <div className="space-y-4">
                <p className="font-bold leading-tight">
                  The AI detected significant structural wear along the shoulder of the road. 
                </p>
                <div className="bg-white/50 p-4 rounded-xl">
                  <h4 className="font-black text-sm mb-2 text-blue-700">AI OBSERVATIONS:</h4>
                  <ul className="text-sm space-y-2 list-disc list-inside font-medium">
                    <li>Crack depth exceeds 2cm</li>
                    <li>Branching patterns identified</li>
                    <li>Potential base-layer failure</li>
                    <li>Immediate sealing recommended</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Severity & Actions */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#D9D9D9] rounded-[30px] p-6 text-black flex flex-col items-center flex-grow">
                <h2 className="text-2xl font-black mb-6 self-start">Severity Level</h2>
                
                <div className="w-28 bg-black rounded-2xl p-2 border-[6px] border-zinc-400">
                  <div className="flex flex-col gap-1 text-[9px] text-white font-bold text-center">
                    <div className="bg-red-600 h-12 flex items-center justify-center rounded-t-sm opacity-40">CRITICAL</div>
                    <div className="bg-orange-500 h-12 flex items-center justify-center opacity-40">SEVERE</div>
                    <div className="bg-yellow-400 h-12 flex items-center justify-center text-black border-4 border-white scale-110 z-10 shadow-lg">MODERATE</div>
                    <div className="bg-green-500 h-12 flex items-center justify-center rounded-b-sm opacity-40">MINOR</div>
                  </div>
                </div>
                <p className="mt-6 font-black text-center text-sm">Status: Action Required</p>
              </div>

              {/* CONDITIONAL UPLOAD BUTTON */}
              {isLoading ? (
                <div className="w-full bg-zinc-800 text-zinc-500 font-black rounded-full px-8 py-4 uppercase tracking-widest text-center animate-pulse">
                  Checking Auth...
                </div>
              ) : isSignedIn ? (
                <button 
                  onClick={() => alert('Proceeding to upload to database...')}
                  className="w-full bg-[#3b82f6] text-white font-black rounded-full px-8 py-4 uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95"
                >
                  Submit Report
                </button>
              ) : (
                // 3. Changed this from a Link to a button that opens the modal
                <button 
                  onClick={() => setShowLogin(true)}
                  className="w-full bg-zinc-800 text-white font-black rounded-full px-8 py-4 uppercase tracking-widest hover:bg-black transition-all shadow-lg flex justify-center text-center border border-white/10"
                >
                  Sign in to Submit
                </button>
              )}
              
            </div>

          </div>
        </div>
      </div>

      {/* 4. Render the modal if showLogin is true */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}