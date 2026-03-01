import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex items-center px-20 overflow-hidden">
      {/* Background image placeholder for the map */}
      <div className="absolute inset-0 z-0 bg-black/50" />
      
      <div className="z-10 text-white">
        <h1 className="text-9xl font-black mb-4">OASYS</h1>
        <p className="text-xl max-w-md border-b-2 border-oasys-blue pb-4 mb-10">
          Automated Road Damage Assessment System.
        </p>
        
        <div className="flex gap-6">
          <Link href="/report-damage" className="btn-blue text-xl">
            Report Damage
          </Link>
          <Link href="/upload-media" className="btn-blue bg-zinc-700 hover:bg-zinc-600 text-xl">
            Scan
          </Link>
          {/*comment here*/}
        </div>
      </div>
    </main>
  );
}