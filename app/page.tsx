import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex items-center px-20 overflow-hidden">
      {/* Background image placeholder for the map */}
      <div className="absolute inset-0 z-0 bg-black/50" />
      
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