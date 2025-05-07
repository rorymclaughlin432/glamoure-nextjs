import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/logo_alt.png'
import { redirect } from 'next/navigation';
import { getCart } from '@/src/lib/db/cart';
import ShoppingCartButton from './ShoppingCartButton';
import UserMenuButton from './UserMenuButton';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/src/lib/auth/authOptions";

async function searchProducts(formData: FormData) {
    "use server";

    const searchQuery = formData.get("searchQuery")?.toString();

    if (searchQuery) {
      redirect("/search?query=" + searchQuery);
    }
  }

export default async function Navbar() {
    const session = await getServerSession(authOptions);
    const cartData = await getCart();
    const cart = cartData
      ? {
          ...cartData,
          items: cartData.items.map(item => ({
            ...item,
            name: item.product.name,
            price: item.product.price,
          })),
        }
      : null;
  return (
  <div className="bg-info">
    <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
        <div className="flex-1">
            <Link href="/" className='btn btn-info text-xl normal-case'>
                <Image src={logo} alt="Glamouré Logo" width={150} height={40} priority  />
            </Link>
        </div>
        <div className='flex-none gap-2'>
            <form action= {searchProducts}>
                <div className='form-control'>
                    <input
                    name='searchQuery'
                    placeholder="Search"
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
