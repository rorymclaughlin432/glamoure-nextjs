import { formatPrice } from '@/src/lib/format';

interface PriceTagProps {
    price: number;
    classname?: string;
}
export default function PriceTag({price, classname} : PriceTagProps) {
    return <span className={`badge ${classname}`}>
        {formatPrice(price)}
        </span>
}