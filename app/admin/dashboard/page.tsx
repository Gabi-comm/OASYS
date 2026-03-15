import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#525252]"> {/* Gray background from your mockup */}
      
      {/* ==========================================
          CURVED BLACK HEADER SECTION
      ========================================== */}
      <div className="bg-black text-white rounded-b-[50px] px-10 pt-30 pb-16 shadow-2xl relative z-0">
        <div className="max-w-6xl mx-auto">
          

          {/* Page Titles & Action Buttons */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-2">Welcome, Admin</h1>
              <p className="text-oasys-blue text-sm font-bold">Here is your analytics for this week</p>
            </div>
            
            <div className="flex gap-3">
              <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-xs hover:bg-gray-200 transition-all active:scale-95">
                Manage
              </button>
              <button className="bg-[#3b82f6] text-white px-6 py-2.5 rounded-full font-bold text-xs hover:bg-blue-600 transition-all active:scale-95 shadow-lg hover:shadow-blue-500/30">
                Edit Widgets
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ==========================================
          WIDGETS GRID SECTION
      ========================================== */}
      {/* Negative margin (-mt-6) to pull the cards slightly up towards the curved header if desired, or keep at 0 for standard spacing */}
      <div className="max-w-6xl mx-auto px-10 mt-8 relative z-10 pb-20">
        
        {/* Top Row: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#3b82f6] rounded-[30px] p-6 h-48 shadow-xl text-white font-bold text-sm flex flex-col hover:-translate-y-1 transition-transform">
            <span>Total Reports Submitted</span>
            <div className="mt-auto text-5xl font-black">--</div> {/* Placeholder for your data */}
          </div>
          
          <div className="bg-black rounded-[30px] p-6 h-48 shadow-xl text-white font-bold text-sm flex flex-col hover:-translate-y-1 transition-transform border border-white/5">
            <span>Reports Pending Review</span>
            <div className="mt-auto text-5xl font-black">--</div>
          </div>
          
          <div className="bg-black rounded-[30px] p-6 h-48 shadow-xl text-white font-bold text-sm flex flex-col hover:-translate-y-1 transition-transform border border-white/5">
            <span>Severe Cases (High Priority)</span>
            <div className="mt-auto text-5xl font-black text-red-500">--</div>
          </div>
        </div>

        {/* Bottom Row: 2 Wider Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black rounded-[30px] p-6 h-64 shadow-xl text-white font-bold text-sm border border-white/5">
            <span>Detection Count [Unresolved/Resolved]</span>
            {/* Chart placeholder would go here */}
          </div>
          
          <div className="bg-black rounded-[30px] p-6 h-64 shadow-xl text-white font-bold text-sm border border-white/5">
            <span>Damage Type Distribution</span>
            {/* Chart placeholder would go here */}
          </div>
        </div>

      </div>
    </div>
  );
}