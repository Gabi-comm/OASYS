import Link from 'next/link';

export default function UploadMediaResult() {
  return (
    <div className="pt-32 px-10 min-h-screen bg-dark-bg">
      <div className="bg-card-bg rounded-oasys p-12 border border-white/5 shadow-2xl relative">
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <p className="text-blue-500 font-bold mb-1 uppercase tracking-widest text-sm">Analyze Results</p>
            <h1 className="text-6xl font-black text-white">Road Damage Report</h1>
          </div>

          {/* Back Button Icon */}
          <Link 
            href="/upload-media" 
            className="p-2 rounded-full hover:bg-white/10 transition-all text-white group"
            title="Back to Upload"
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
                <span>94.2%</span>
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
                <ul className="text-sm space-y-2 list-disc list-inside">
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
                  <div className="bg-red-600 h-12 flex items-center justify-center rounded-t-sm">CRITICAL</div>
                  <div className="bg-orange-500 h-12 flex items-center justify-center">SEVERE</div>
                  <div className="bg-yellow-400 h-12 flex items-center justify-center text-black border-4 border-white scale-110 z-10 shadow-lg">MODERATE</div>
                  <div className="bg-green-500 h-12 flex items-center justify-center rounded-b-sm">MINOR</div>
                </div>
              </div>
              <p className="mt-6 font-black text-center text-sm">Status: Action Required</p>
            </div>

            {/* Submit Button */}
            <Link href="/" className="btn-blue w-full flex items-center justify-between px-8 py-4">
              <span className="uppercase tracking-widest">Submit Report </span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}