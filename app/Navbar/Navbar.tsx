import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/logo.png'
import { redirect } from 'next/navigation';
import { getCart } from '@/src/lib/db/cart';
import ShoppingCartButton from './ShoppingCartButton';
import UserMenuButton from './UserMenuButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

async function searchProducts(formData: FormData) {
    "use server";

    const searchQuery = formData.get('searchQuery')?.toString();

    if (searchQuery) {
        redirect(`/search?q=${searchQuery}`);   
        
    }
}

export default async function Navbar() {
    const session = await getServerSession(authOptions);
    const cart = await getCart();
  return (
  <div className="bg-base-100">
    <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
        <div className="flex-1">
            <Link href="/" className='btn btn-ghost text-xl normal-case'>
                <Image src={logo} alt="Flowmazon Logo" width={40} height={40} />
                Flowmazon
            </Link>
        </div>
        <div className='flex-none gap-2'>
            <form action= {searchProducts}>
                <div className='form-control'>
                    <input 
                    name='searchQuery'
                    placeholder="Search" 
                    type='text'
                    className='input input-bordered w-full min-w-[100px]' />
                </div>
            </form>
            <ShoppingCartButton cart={cart} />
            <UserMenuButton session={session}></UserMenuButton>
        </div>
    </div>
  </div>
  )
}
