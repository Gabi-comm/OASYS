'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdminStatus = async () => {
      // 1. Get the current logged-in user
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      // 2. Check if they exist AND if their hidden  role is 'admin'
      if (user && user.user_metadata?.role === 'admin') {
        setIsAuthorized(true); // Let them in!
      } else {
        // 3. Kick them back to the home page!
        router.push('/');
      }
    };

    checkAdminStatus();
  }, [router]);

  // Show a blank screen or loading spinner while the bouncer checks their ID
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center text-white">
        <p className="animate-pulse font-bold tracking-widest uppercase">Verifying Admin Access...</p>
      </div>
    );
  }

  // If they pass the check, render the admin pages!
  return <>{children}</>;
}