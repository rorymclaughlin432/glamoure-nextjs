import { products } from '@prisma/client';
import Link from 'next/link';
import PriceTag from './PriceTag';
import Image from 'next/image';

interface ProductCardProps {
    product: products;
}

export default function ProductCard({product}: ProductCardProps ) {
    const isNew = Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;
    return (
        <Link 
        href={`/products/${product.id}`}
        className="card w-full bg-base-100 hover:shadow-xl transition-shadow">
           <figure>
            <Image 
            src={product.imageUrl} 
            alt={product.name} 
            width={800} 
            height={400}
            className='h-48 object-cover'
            />
           </figure>
           <div className='card-body'>
            <h2 className='card-title'>{product.name}
            {isNew && <div className='badge badge-secondary'>New</div>}
            </h2>
            {/* <img src={product.imageUrl} className='card-body' /> */}
            <p className='card-body'>{product.description}
            {/* <p className='card-body'>${product.price}</p> */}
            <PriceTag price={Number(product.price)} /></p>
              </div>

        </Link>
    )

}