import Link from 'next/link';

export default function ReportDamagePage() {
  return (
    <div className="pt-32 px-10 min-h-screen bg-[#1a1a1a]">
      {/* Container with rounded corners from Figma */}
      <div className="bg-[#262626] rounded-[40px] p-12 border border-white/5 shadow-2xl">
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-blue-500 font-bold text-sm uppercase tracking-wider mb-1">
              Pin Area Here
            </p>
            <h1 className="text-5xl font-extrabold text-white">
              Report Road <br /> Damage
            </h1>
          </div>
          
          {/* Right Side Actions */}
          <div className="flex flex-col items-end gap-4">
            {/* Back Button Icon */}
            <Link 
              href="/" 
              className="p-2 rounded-full hover:bg-white/10 transition-all text-white group"
              title="Back to Home"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="group-hover:-translate-x-1 transition-transform"
              >
                <path d="M19 12H5"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
            </Link>

            {/* Proceed to Upload Media */}
            <Link href="/report-damage/upload" className="btn-blue">
              Pin Area
            </Link>
          </div>
        </div>

        {/* Location Display */}
        <div className="mb-6 flex items-center gap-4">
          <span className="text-blue-500 font-bold text-xl">Location:</span>
          <div className="bg-[#D9D9D9] text-black px-6 py-2 rounded-md font-medium flex-grow">
            105 Samson Road 1400 Caloocan City Metro Manila
          </div>
        </div>

        {/* Map and Pin Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Map View */}
          <div className="lg:col-span-2 bg-gray-300 rounded-2xl h-[450px] relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('/homepage.jpg')] bg-cover bg-center opacity-80" />
             <div className="absolute inset-0 flex items-center justify-center">
                {/* Red Pin Placeholder */}
                <div className="w-8 h-8 bg-red-600 rounded-full border-4 border-white shadow-lg animate-bounce" />
             </div>
          </div>

          {/* Pin Area Card */}
          <div className="bg-[#D9D9D9] rounded-2xl p-6 text-black flex flex-col">
            <h3 className="text-2xl font-black mb-4">Pin Area</h3>
            
            {/* Street View/Photo Placeholder */}
            <div className="bg-gray-400 rounded-xl aspect-video mb-6 overflow-hidden">
               <div className="w-full h-full bg-zinc-500 flex items-center justify-center text-white italic">
                 Street View Placeholder
               </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-1">Address</p>
              <div className="flex gap-2 items-start">
                <span className="mt-1">📍</span>
                <p className="text-sm leading-tight">
                  105 Samson Road 1400 <br />
                  Caloocan City Metro <br />
                  Manila
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}