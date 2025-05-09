'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AccessDeniedPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">🚫 Access Denied</h1>
      <p className="text-lg mb-4">You do not have permission to access this page.</p>
      <p className="text-sm text-gray-500">You will be redirected to the home page shortly...</p>
    </div>
  );
}