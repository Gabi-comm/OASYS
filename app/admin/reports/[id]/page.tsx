import Link from "next/link";

export default function FileVerification() {
  return (
    <div className="min-h-screen bg-[#333333] pr-16 py-6 md:pr-32 relative">
      {/* ==========================================
          OUTER BACKGROUND (Dark Gray Side Strip)
      ========================================== */}

      {/* Close Button / Back Button (Floating in the gray area) */}
      <Link
        href="/admin/reports"
        className="absolute top-10 right-4 md:right-10 w-12 h-12 bg-[#3b82f6] border-4 border-[#b0bec5] rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-xl"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Link>

      {/* ==========================================
          MAIN BLACK CONTAINER (Rounded Top-Right)
      ========================================== */}
      <div className="bg-black min-h-screen rounded-r-[60px] md:rounded-r-[100px] p-10 md:p-16 flex flex-col">

        {/* HEADER */}
        <div className="mb-10">
          <p className="text-[#3b82f6] font-bold tracking-wider mb-1 uppercase text-sm">
            Analyze Results
          </p>
          <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight">
            Road Damage<br />Report
          </h1>
        </div>

        {/* ==========================================
            3-COLUMN GRID
        ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">

          {/* COLUMN 1: Image & Details */}
          <div className="bg-[#d1d5db] rounded-[20px] p-6 flex flex-col">
            {/* Dark Gray Image Placeholder */}
            <div className="w-full aspect-square md:aspect-video bg-[#525252] rounded-[16px] mb-4" />
            
            <h3 className="text-black font-black text-2xl mb-4">File_Name.jpg</h3>
            
            <div className="text-black font-bold text-sm space-y-1">
              <p>Detected Damage Type: <span className="font-normal text-gray-700">..........</span></p>
              <p>Severity Level: <span className="font-normal text-gray-700"></span></p>
              <p>Location: <span className="font-normal text-gray-700"></span></p>
            </div>
          </div>

          {/* COLUMN 2: Recommendations */}
          <div className="bg-[#d1d5db] rounded-[20px] p-6">
            <h3 className="text-black font-black text-2xl mb-4">Recommendation:</h3>
            <ul className="text-black font-bold text-sm space-y-2 list-disc pl-6">
              <li>LINE 1</li>
              <li>LINE 2</li>
              <li>LINE 3</li>
              <li>LINE 4</li>
              <li>LINE 5</li>
              <li>LINE 6</li>
            </ul>
          </div>

          {/* COLUMN 3: Severity Level */}
          <div className="bg-[#d1d5db] rounded-[20px] p-6 flex flex-col items-center">
            <h3 className="text-black font-black text-2xl mb-4 text-center">Severity Level</h3>
            
            {/* The Black Inner Box for the Meter */}
            <div className="bg-black w-full rounded-[16px] p-6 flex flex-grow items-center justify-center gap-6">
              
              {/* White Labels */}
              <div className="flex flex-col justify-between h-56 text-right text-sm font-bold text-white">
                <span className="mt-2">Critical</span>
                <span>Severe</span>
                <span>Moderate</span>
                <span className="mb-2">Minor</span>
              </div>
              
              {/* Color Bar */}
              <div className="w-16 h-56 rounded-lg overflow-hidden flex flex-col border border-white/10">
                <div className="flex-1 bg-[#ff0000]" /> {/* Red */}
                <div className="flex-1 bg-[#ff8c00]" /> {/* Orange */}
                <div className="flex-1 bg-[#ffff00]" /> {/* Yellow */}
                <div className="flex-1 bg-[#00ff00]" /> {/* Green */}
              </div>

            </div>
          </div>

        </div>

        {/* ==========================================
            PROCEED BUTTON (Aligned bottom right)
        ========================================== */}
        <div className="w-full flex justify-end mt-6">
          <button className="bg-[#3b82f6] text-white font-bold px-8 py-3 rounded-full flex items-center gap-4 hover:brightness-110 active:scale-95 transition-all shadow-lg">
            <span className="text-lg">Proceed</span>
            <div className="w-6 h-6 bg-white rounded-full" />
          </button>
        </div>

      </div>
    </div>
  );
}