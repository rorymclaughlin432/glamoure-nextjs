import { NextResponse } from 'next/server';
import { clearCart } from '@/app/cart/actions';

export async function POST() {
  try {
    await clearCart((count: number) => {
      console.log(`Cart count updated to: ${count}`);
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error clearing the cart:', error);
    return NextResponse.json({ error: 'Failed to clear the cart' }, { status: 500 });
  }
}