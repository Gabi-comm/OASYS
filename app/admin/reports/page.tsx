import Link from 'next/link';

export default function AdminReports() {
  return (
    <div className="min-h-screen bg-[#525252]">
      
      {/* ==========================================
          CURVED BLACK HEADER SECTION
      ========================================== */}
      {/* Kept the pt-28 here so it safely clears your floating navbar! */}
      <div className="bg-black text-white rounded-b-[50px] px-10 pt-30 pb-12 shadow-2xl relative z-0">
        <div className="max-w-6xl mx-auto">

          {/* Page Title */}
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-2">Reports</h1>
            <p className="text-[#3b82f6] text-sm font-bold">See all reports accumulated</p>
          </div>

        </div>
      </div>

      {/* ==========================================
          MAIN CONTENT: SEARCH & LIST
      ========================================== */}
      <div className="max-w-6xl mx-auto px-10 mt-8 relative z-10 pb-20">
        
        {/* Search Bar */}
        <div className="mb-10">
          <input 
            type="text" 
            placeholder="Search reports by location, severity, or ID..." 
            className="w-full bg-white rounded-full px-8 py-4 text-black font-bold shadow-lg focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/50 transition-all placeholder-gray-400"
          />
        </div>

        {/* White List Panels (I made two so you can see the spacing) */}
        <div className="flex flex-col gap-6">
          
          {/* Single Report Item */}
          <div className="bg-white rounded-[30px] p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:-translate-y-1 transition-transform">
            <div>
              <h3 className="text-black font-black text-2xl mb-1">Report #001 - Severe Pothole</h3>
              <p className="text-gray-500 font-bold text-sm">Location: EDSA, Caloocan | Date: Oct 12, 2023</p>
            </div>
            
            {/* View Report Button */}
            <button className="bg-[#3b82f6] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-blue-600 transition-all active:scale-95 shadow-lg">
              View Report
            </button>
          </div>

          {/* Another Report Item */}
          <div className="bg-white rounded-[30px] p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:-translate-y-1 transition-transform">
            <div>
              <h3 className="text-black font-black text-2xl mb-1">Report #002 - Surface Cracks</h3>
              <p className="text-gray-500 font-bold text-sm">Location: Monumento Circle | Date: Oct 11, 2023</p>
            </div>
            
            <button className="bg-[#3b82f6] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-blue-600 transition-all active:scale-95 shadow-lg">
              View Report
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}