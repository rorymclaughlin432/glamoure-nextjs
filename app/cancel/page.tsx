'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CancelPage() {
      const router = useRouter();

      useEffect(() => {
        const timer = setTimeout(() => {
          router.push('/');
        }, 5000); // ⏳ 5 seconds delay

        return () => clearTimeout(timer);
      }, [router]);

    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">😢 Payment Cancelled</h1>
      </div>
    );
  }
