"use client";
import { useState } from 'react';

export default function LoginModal({ onClose }: { onClose: () => void }) {
  // State: false = Show Sign Up (Cover is on the right)
  // State: true = Show Log In (Cover is on the left)
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      
      {/* Main Modal Container - Needs to be wide enough for two panels */}
      <div className="relative w-full max-w-[800px] h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        
        {/* ==========================================
            LEFT SIDE: SIGN UP FORM
        ========================================== */}
        <div className="absolute top-0 left-0 w-1/2 h-full p-12 flex flex-col justify-center bg-white">
          <h2 className="text-4xl font-black mb-6 text-center text-[#3b82f6]">Sign Up</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 px-1 mb-1">Email</label>
              <input 
                type="email" 
                className="w-full bg-gray-100 text-black px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all" 
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 px-1 mb-1">Username</label>
              <input 
                type="text" 
                className="w-full bg-gray-100 text-black px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all" 
                placeholder="Choose a username"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 px-1 mb-1">Password</label>
              <input 
                type="password" 
                className="w-full bg-gray-100 text-black px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all" 
                placeholder="Create a password"
              />
            </div>
          </div>
          
          <button className="mt-8 w-full bg-[#262626] hover:bg-blue-600 text-white font-bold py-3 rounded-full transition-all shadow-lg hover:shadow-blue-500/50">
            Create Account
          </button>
        </div>


        {/* ==========================================
            RIGHT SIDE: LOG IN FORM
        ========================================== */}
        <div className="absolute top-0 right-0 w-1/2 h-full p-12 flex flex-col justify-center bg-white">
          <h2 className="text-4xl font-black mb-6 text-center text-[#3b82f6]">Log In</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 px-1 mb-1">Email</label>
              <input 
                type="email" 
                className="w-full bg-gray-100 text-black px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all" 
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 px-1 mb-1">Password</label>
              <input 
                type="password" 
                className="w-full bg-gray-100 text-black px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all" 
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Small Forgot Password */}
          <div className="text-right mt-2">
            <button className="text-xs text-gray-500 hover:text-[#3b82f6] font-bold transition-colors">
              Forgot Password?
            </button>
          </div>

          <button className="mt-6 w-full bg-[#262626] hover:bg-blue-600 text-white font-bold py-3 rounded-full transition-all shadow-lg hover:shadow-blue-500/50">
            Log In
          </button>
        </div>


        {/* ==========================================
            THE MAGIC SLIDING BLUE COVER
        ========================================== */}
        <div 
          className={`absolute top-0 left-0 w-1/2 h-full bg-[#262626] text-white z-10 transition-transform duration-700 ease-in-out shadow-2xl flex items-center justify-center
            ${!isLogin ? 'translate-x-full rounded-l-[40px]' : 'translate-x-0 rounded-r-[40px]'}
          `}
        >
          {/* Inner Content Container */}
          <div className="relative w-full h-full flex items-center justify-center text-center px-10">
            
            {/* Prompt to Sign Up (Fades in when cover is on the Left) */}
            <div className={`absolute transition-all duration-700 ease-in-out flex flex-col items-center ${isLogin ? 'opacity-100 translate-x-0 delay-200' : 'opacity-0 -translate-x-12 pointer-events-none'}`}>
              <h2 className="text-4xl font-black mb-4">New Here?</h2>
              <p className="mb-8 font-medium text-white-100">Sign up and discover a great amount of new opportunities!</p>
              <span className="text-sm mb-3 text-oasys-blue font-bold">{"Don't have an account?"} </span>
              <button 
                onClick={() => setIsLogin(false)}
                className="border-2 border-white rounded-full px-12 py-3 font-bold hover:bg-white hover:text-[#262626] transition-all active:scale-95"
              >
                Sign Up
              </button>
            </div>

            {/* Prompt to Log In (Fades in when cover is on the Right) */}
            <div className={`absolute transition-all duration-700 ease-in-out flex flex-col items-center ${!isLogin ? 'opacity-100 translate-x-0 delay-200' : 'opacity-0 translate-x-12 pointer-events-none'}`}>
              <h2 className="text-4xl font-black mb-4">Welcome Back!</h2>
              <p className="mb-8 font-medium text-white-100">To keep connected with us please login with your personal info.</p>
              <span className="text-sm mb-3 text-oasys-blue font-bold">Already have an account?</span>
              <button 
                onClick={() => setIsLogin(true)}
                className="border-2 border-white rounded-full px-12 py-3 font-bold hover:bg-white hover:text-[#262626] transition-all active:scale-95"
              >
                Log In
              </button>
            </div>

          </div>
        </div>

        <button 
          onClick={onClose}
          className={`absolute top-4 z-20 w-8 h-8 flex items-center justify-center rounded-full transition-colors font-bold
            ${!isLogin ? 'right-4 text-white hover:bg-white/20' : 'right-4 text-gray-400 hover:bg-gray-100'}
          `}
        >
          ✕
        </button>

      </div>
    </div>
  );
}