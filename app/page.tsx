'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {

  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const moveX = (e.clientX / window.innerWidth - 0.5) * 30; 
    const moveY = (e.clientY / window.innerHeight - 0.5) * 30;
    
    setOffset({ x: -moveX, y: -moveY });
  };

  return (
    <main 
      className="relative min-h-screen flex items-center px-20 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* 3. Parallax Map Background */}
      <div 
        className="absolute z-0 pointer-events-none transition-transform duration-75 ease-out"
        style={{
          width: '110vw',
          height: '110vh',
          left: '-5vw',
          top: '-5vh',
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
      >
        <iframe 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          src="https://www.openstreetmap.org/export/embed.html?bbox=120.9634,14.6409,120.9958,14.6715&layer=mapnik" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      {/* To Enzo Chan:
      
          Center OASYS Logo
          Bigger everything sa gitna
          Add either a Header or rounded shapes sa Top Right */}
      <div className="absolute inset-0 z-0 bg-black/50 pointer-events-none" />
      <div className="z-10 text-white">
        <h1 className="text-9xl font-black mb-4 text-center">OASYS</h1>
        <p className="text-l max-w-md border-b-2 border-oasys-blue pb-4 mb-10 text-center mx-auto">
          Neuro-Symbolic AI Road Damage Assessment System
        </p>
        
        <div className="flex gap-6 w-full max-w-xl mx-auto">
          <Link 
            href="/report-damage" 
            className="btn-blue flex-1 inline-flex items-center justify-center px-8 py-4 text-xl whitespace-nowrap">
            Report Damage
          </Link>
          <Link 
            href="/upload-media" 
            className="btn-blue bg-zinc-700 hover:bg-zinc-600 flex-1 inline-flex items-center justify-center px-8 py-4 text-xl">
            Scan
          </Link>
        </div>
      </div>
    </main>
  );
}