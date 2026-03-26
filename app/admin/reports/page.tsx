'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminReports() {
  const [reports, setReports] = useState([
    // MOCK DATA replace with DATABASE DATA
    {
      id: 'RPT-001',
      type: 'Longitudinal Crack',
      location: 'EDSA, Caloocan',
      date: 'Oct 12, 2023',
      severity: 'Critical',
      status: 'Pending',
      confidence: '94.2%',
      description: 'The AI detected significant structural wear along the shoulder of the road. Crack depth exceeds 2cm.',
      fileName: 'Road_Scan_001.mp4',
      imageUrl: 'https://placehold.co/800x1200/222/EEE?text=Tall+Image+%0A+(Shrunk+to+Fit)',
      aiObservations: [
        'Crack depth exceeds 2cm',
        'Branching patterns identified',
        'Potential base-layer failure',
        'Immediate sealing recommended'
      ]
    },
    {
      id: 'RPT-002',
      type: 'Pothole',
      location: 'Monumento Circle',
      date: 'Oct 11, 2023',
      severity: 'Moderate',
      status: 'In Review',
      confidence: '88.5%',
      description: 'Surface level alligator cracking detected near pedestrian crossing.',
      fileName: 'IMG_8842.jpg',
      imageUrl: 'https://placehold.co/1200x400/222/EEE?text=Wide+Image+%0A+(Shrunk+to+Fit)',
      aiObservations: [
        'Surface wear detected',
        'No deep structural damage yet',
        'Monitor for water pooling',
        'Standard patching advised'
      ]
    },
  ]);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [reopeningId, setReopeningId] = useState<string | null>(null);

  const toggleReport = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const confirmResolve = () => {
    if (!resolvingId) return;
    setReports(prev => prev.map(r => r.id === resolvingId ? { ...r, status: 'Resolved' } : r));
    setResolvingId(null);
  };

  const confirmReopen = () => {
    if (!reopeningId) return;
    setReports(prev => prev.map(r => r.id === reopeningId ? { ...r, status: 'In Review' } : r));
    setReopeningId(null);
  };

  const filteredReports = reports.filter(report => {
    const query = searchQuery.toLowerCase();
    return (
      report.id.toLowerCase().includes(query) ||
      report.location.toLowerCase().includes(query) ||
      report.severity.toLowerCase().includes(query) ||
      report.type.toLowerCase().includes(query) ||
      report.date.toLowerCase().includes(query)
    );
  });

  const unresolvedReports = filteredReports.filter(r => r.status !== 'Resolved');
  const resolvedReports = filteredReports.filter(r => r.status === 'Resolved');

  const renderCard = (report: any, isResolvedColumn: boolean) => {
    const isOpen = expandedId === report.id;

    return (
      <div 
        key={report.id}
        className="bg-white rounded-[30px] p-6 shadow-xl transition-transform duration-300 hover:-translate-y-1"
      >
        {/* TOP ROW */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-black font-black text-xl">{report.id} - {report.type}</h3>
              <span className={`px-2 py-1 text-[9px] font-black uppercase tracking-wider rounded-full ${
                report.severity === 'Critical' ? 'bg-red-100 text-red-600' : 
                report.severity === 'Severe' ? 'bg-orange-100 text-orange-600' :
                report.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-600' :
                'bg-green-100 text-green-600'
              }`}>
                {report.severity}
              </span>
            </div>
            <p className="text-gray-500 font-bold text-xs">Loc: {report.location} | {report.date}</p>
          </div>
          
          <button 
            onClick={() => toggleReport(report.id)}
            className={`px-6 py-2 rounded-full font-bold text-xs transition-all active:scale-95 shadow-lg whitespace-nowrap ${
              isOpen 
                ? 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300 shadow-none' 
                : 'bg-[#3b82f6] text-white hover:bg-blue-600'
            }`}
          >
            {isOpen ? 'Close' : 'Review'}
          </button>
        </div>

        {/* MINI VIEW */}
        <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'
        }`}>
          <div className="overflow-hidden">
            <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row gap-6">
              
              {/* LEFT SIDE */}
              <div className="w-full md:w-1/2 flex flex-col gap-2">
                <div className="w-full aspect-video bg-black rounded-xl overflow-hidden relative flex items-center justify-center">
                  <img 
                    src={report.imageUrl} 
                    alt="AI Detected Damage" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex justify-between items-center text-xs px-1">
                  <span className="font-black text-zinc-800 truncate pr-4" title={report.fileName}>{report.fileName}</span>
                  <span className="whitespace-nowrap">
                    <span className="font-bold text-zinc-500">Confidence: </span>
                    <span className="text-blue-700 font-black">{report.confidence}</span>
                  </span>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="w-full md:w-1/2 flex flex-col h-full">
                <h2 className="text-xs font-black mb-1 uppercase text-black tracking-wider">Detection Details</h2>
                <p className="text-xs font-medium leading-relaxed mb-3 text-zinc-600">{report.description}</p>
                
                <div className="bg-zinc-100 p-3 rounded-xl border border-zinc-200 mb-4">
                  <h4 className="font-black text-[10px] mb-2 text-blue-700 uppercase tracking-widest">Observations:</h4>
                  <ul className="text-[11px] space-y-1 list-disc list-inside font-medium text-zinc-700">
                    {report.aiObservations.map((obs: string, idx: number) => (
                      <li key={idx}>{obs}</li>
                    ))}
                  </ul>
                </div>

                {/* BOTTOM RIGHT */}
                <div className="mt-auto flex justify-between items-end gap-3 pt-2 border-t border-zinc-100">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase text-zinc-400">Current Status</span>
                    <span className={`text-[10px] px-2 py-1 rounded font-black uppercase tracking-wider ${
                      isResolvedColumn ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    } inline-block w-max`}>
                      {report.status}
                    </span>
                  </div>
                  
                  {isResolvedColumn ? (
                    <button 
                      onClick={() => setReopeningId(report.id)}
                      className="px-6 py-2.5 rounded-xl font-bold text-xs bg-zinc-900 text-white hover:bg-black transition-all shadow-md active:scale-95"
                    >
                      Reopen Report
                    </button>
                  ) : (
                    <button 
                      onClick={() => setResolvingId(report.id)}
                      className="px-6 py-2.5 rounded-xl font-bold text-xs bg-green-500 text-white hover:bg-green-600 transition-all shadow-md active:scale-95"
                    >
                      Mark Resolved ✓
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#525252]">
      
      {/* HEADER */}
      <div className="bg-black text-white rounded-b-[50px] px-6 md:px-12 pt-32 pb-12 shadow-2xl relative z-0">
        <div className="w-full flex justify-between items-end">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-2">Reports</h1>
            <p className="text-[#3b82f6] text-sm font-bold uppercase tracking-widest">Master Database</p>
          </div>
          <Link href="/admin/dashboard" className="text-zinc-400 hover:text-white font-bold text-sm transition-colors">
            &larr; Back to Dashboard
          </Link>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="w-full px-6 md:px-12 mt-8 relative z-10 pb-20">
        
        {/* SEARCH */}
        <div className="mb-10">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reports by location, date, severity, or ID..." 
            className="w-full bg-white rounded-full px-8 py-4 text-black font-bold shadow-lg focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/50 transition-all placeholder-gray-400"
          />
        </div>

        {filteredReports.length === 0 && (
          <div className="bg-white/10 rounded-[30px] p-12 text-center border border-white/20 mb-8 w-full">
            <h3 className="text-white text-2xl font-black mb-2">No reports found</h3>
            <p className="text-gray-400 font-bold">Try adjusting your search terms.</p>
          </div>
        )}

        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT COLUMN: UNRESOLVED */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 px-2">
              <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></div>
              <h2 className="text-xl font-black text-white uppercase tracking-widest">Needs Action ({unresolvedReports.length})</h2>
            </div>
            
            {unresolvedReports.length === 0 && filteredReports.length > 0 ? (
               <p className="text-zinc-400 font-medium px-2 italic">All caught up! No pending reports.</p>
            ) : (
               unresolvedReports.map(report => renderCard(report, false))
            )}
          </div>

          {/* RIGHT COLUMN: RESOLVED */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 px-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <h2 className="text-xl font-black text-white uppercase tracking-widest">Resolved ({resolvedReports.length})</h2>
            </div>

            {resolvedReports.length === 0 && filteredReports.length > 0 ? (
               <p className="text-zinc-400 font-medium px-2 italic">No resolved reports match this search.</p>
            ) : (
               resolvedReports.map(report => renderCard(report, true))
            )}
          </div>

        </div>
      </div>

      {/* RESOLVE MODAL */}
      {resolvingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[30px] p-8 max-w-sm w-full shadow-2xl">
            <h3 className="text-2xl font-black text-black mb-2">Resolve Report?</h3>
            <p className="text-zinc-600 font-medium text-sm mb-8">
              Move <span className="font-bold text-black">{resolvingId}</span> to the resolved queue?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setResolvingId(null)} className="flex-1 bg-zinc-200 text-black py-3 rounded-xl font-bold text-sm hover:bg-zinc-300 transition-colors">Cancel</button>
              <button onClick={confirmResolve} className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold text-sm hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30">Resolve</button>
            </div>
          </div>
        </div>
      )}

      {/* REOPEN MODAL */}
      {reopeningId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[30px] p-8 max-w-sm w-full shadow-2xl border-4 border-zinc-900">
            <h3 className="text-2xl font-black text-black mb-2">Reopen Report?</h3>
            <p className="text-zinc-600 font-medium text-sm mb-8">
              Are you sure you want to move <span className="font-bold text-black">{reopeningId}</span> back to the Needs Action queue?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setReopeningId(null)} className="flex-1 bg-zinc-200 text-black py-3 rounded-xl font-bold text-sm hover:bg-zinc-300 transition-colors">Cancel</button>
              <button onClick={confirmReopen} className="flex-1 bg-zinc-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-black transition-colors">Reopen</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}