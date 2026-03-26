'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  // MOCK DATA STATES
  const [stats] = useState({
    total: 142,
    pending: 38,
    severe: 12,
    resolved: 104,
  });

  const [recentReports] = useState([
    { id: 'RPT-001', type: 'Longitudinal Crack', severity: 'Severe', date: 'Oct 24, 2024', status: 'Pending' },
    { id: 'RPT-002', type: 'Pothole', severity: 'Critical', date: 'Oct 24, 2024', status: 'In Review' },
    { id: 'RPT-003', type: 'Alligator Crack', severity: 'Moderate', date: 'Oct 23, 2024', status: 'Resolved' },
    { id: 'RPT-004', type: 'Pothole', severity: 'Minor', date: 'Oct 23, 2024', status: 'Resolved' },
  ]);

  // NEW: Time Filter State
  const [timeFilter, setTimeFilter] = useState('This Week');

  return (
    <div className="min-h-screen bg-[#525252]"> 
      
      {/* ==========================================
          CURVED BLACK HEADER SECTION
      ========================================== */}
      <div className="bg-black text-white rounded-b-[50px] px-10 pt-32 pb-24 shadow-2xl relative z-0">
        <div className="max-w-6xl mx-auto">
          
          {/* Page Titles & Action Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">Admin Console</h1>
              <p className="text-blue-500 text-sm font-bold uppercase tracking-widest">Analytics Overview</p>
            </div>
            
            <div className="flex gap-3">
              <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-xs hover:bg-gray-200 transition-all active:scale-95">
                Export Data
              </button>
              <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-xs hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-500/30">
                System Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          WIDGETS GRID SECTION
      ========================================== */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 -mt-10 relative z-10 pb-20">
        
        {/* Top Row: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-600 rounded-[30px] p-6 h-48 shadow-xl text-white flex flex-col hover:-translate-y-1 transition-transform">
            <span className="font-bold text-sm text-blue-100">Total Reports Submitted</span>
            <div className="mt-auto text-6xl font-black">{stats.total}</div> 
          </div>
          
          <div className="bg-zinc-900 rounded-[30px] p-6 h-48 shadow-xl text-white flex flex-col hover:-translate-y-1 transition-transform border border-white/10">
            <span className="font-bold text-sm text-gray-400">Reports Pending Review</span>
            <div className="mt-auto flex items-baseline gap-3">
              <span className="text-6xl font-black">{stats.pending}</span>
              <span className="text-sm text-yellow-500 font-bold bg-yellow-500/10 px-3 py-1 rounded-full">+4 today</span>
            </div>
          </div>
          
          <div className="bg-zinc-900 rounded-[30px] p-6 h-48 shadow-xl text-white flex flex-col hover:-translate-y-1 transition-transform border border-white/10">
            <span className="font-bold text-sm text-gray-400">Severe Cases (High Priority)</span>
            <div className="mt-auto text-6xl font-black text-red-500 animate-pulse">{stats.severe}</div>
          </div>
        </div>

        {/* Middle Row: Visual Charts Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-zinc-900 rounded-[30px] p-8 shadow-xl text-white border border-white/10 flex flex-col">
            <span className="font-bold text-sm text-gray-400 mb-6">Resolution Status</span>
            {/* CSS Progress Bar */}
            <div className="mt-auto">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-green-400">Resolved ({stats.resolved})</span>
                <span className="text-yellow-500">Unresolved ({stats.pending})</span>
              </div>
              <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden flex">
                <div className="bg-green-500 h-full" style={{ width: '73%' }}></div>
                <div className="bg-yellow-500 h-full" style={{ width: '27%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="bg-zinc-900 rounded-[30px] p-8 shadow-xl text-white border border-white/10 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-sm text-gray-400">Damage Trend (Over Time)</span>
              
              {/* NEW: Interactive Filter Dropdown */}
              <select 
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-blue-500/10 text-blue-500 text-xs font-bold px-3 py-1.5 rounded-md border border-blue-500/20 outline-none cursor-pointer hover:bg-blue-500/20 transition-colors focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="Today" className="bg-zinc-800 text-white">Today</option>
                <option value="This Week" className="bg-zinc-800 text-white">This Week</option>
                <option value="This Month" className="bg-zinc-800 text-white">This Month</option>
                <option value="This Year" className="bg-zinc-800 text-white">This Year</option>
              </select>

            </div>
            
            {/* SVG Line Graph Placeholder */}
            <div className="mt-auto relative w-full h-32 flex flex-col justify-end pb-4">
              <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                <path d="M0,35 L20,20 L40,28 L60,10 L80,18 L100,5 L100,40 L0,40 Z" fill="url(#lineGradient)" />
                <polyline fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points="0,35 20,20 40,28 60,10 80,18 100,5" />
                
                <circle cx="0" cy="35" r="2" fill="#18181b" stroke="#3b82f6" strokeWidth="1.5"/>
                <circle cx="20" cy="20" r="2" fill="#18181b" stroke="#3b82f6" strokeWidth="1.5"/>
                <circle cx="40" cy="28" r="2" fill="#18181b" stroke="#3b82f6" strokeWidth="1.5"/>
                <circle cx="60" cy="10" r="2" fill="#18181b" stroke="#3b82f6" strokeWidth="1.5"/>
                <circle cx="80" cy="18" r="2" fill="#18181b" stroke="#3b82f6" strokeWidth="1.5"/>
                <circle cx="100" cy="5" r="2" fill="#fff" stroke="#3b82f6" strokeWidth="1.5" className="animate-pulse"/>
              </svg>

              {/* X-axis labels (These would eventually update based on the filter too!) */}
              <div className="absolute -bottom-2 left-0 w-full flex justify-between text-[10px] text-gray-500 font-bold">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span className="text-blue-400">Sat</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            RECENT REPORTS TABLE
        ========================================== */}
        <div className="bg-zinc-900 rounded-[30px] p-8 shadow-xl text-white border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black tracking-wide">Recent Submissions</h2>
            <Link href="/admin/reports" className="text-sm text-blue-500 hover:text-blue-400 font-bold transition-colors">
              View All Reports &rarr;
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-gray-400 border-b border-white/10">
                <tr>
                  <th className="pb-3 font-bold">ID</th>
                  <th className="pb-3 font-bold">Damage Type</th>
                  <th className="pb-3 font-bold">Severity</th>
                  <th className="pb-3 font-bold">Date</th>
                  <th className="pb-3 font-bold">Status</th>
                  <th className="pb-3 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentReports.map((report, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors group">
                    <td className="py-4 font-mono text-gray-300">{report.id}</td>
                    <td className="py-4 font-bold">{report.type}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold
                        ${report.severity === 'Critical' ? 'bg-red-500/20 text-red-500' : ''}
                        ${report.severity === 'Severe' ? 'bg-orange-500/20 text-orange-400' : ''}
                        ${report.severity === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                        ${report.severity === 'Minor' ? 'bg-green-500/20 text-green-400' : ''}
                      `}>
                        {report.severity}
                      </span>
                    </td>
                    <td className="py-4 text-gray-400">{report.date}</td>
                    <td className="py-4">
                       <span className={`flex items-center gap-2
                        ${report.status === 'Resolved' ? 'text-green-500' : 'text-gray-300'}
                       `}>
                          {report.status === 'Resolved' && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
                          {report.status === 'Pending' && <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>}
                          {report.status === 'In Review' && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
                          {report.status}
                       </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="text-blue-500 hover:text-white text-xs font-bold transition-colors opacity-0 group-hover:opacity-100">
                        Review &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}