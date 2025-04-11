'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const clearCartAfterPayment = async () => {
      try {
        const response = await fetch('/api/clear-cart', {
          method: 'POST',
        });

        if (!response.ok) {
          console.error('Failed to clear the cart:', await response.text());
        }
      } catch (error) {
        console.error('Error clearing the cart:', error);
      }
    };

    clearCartAfterPayment();

    const timer = setTimeout(() => {
      router.push('/');
    }, 5000); // ⏳ 5 seconds delay

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg mb-4">Thank you for your purchase.</p>
      <p className="text-sm text-gray-500">You’ll be redirected to the home page shortly...</p>
    </div>
  );
}
