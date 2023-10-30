import ProductCard from "@/components/ProductCard";
import { prisma } from "@/src/lib/db/prisma";
import { Metadata } from "next";

interface SearchPageProps {
  searchParams: { query: string };
}

export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `Search: ${query} - Flowmazon`,
  };
}

export default async function SearchPage({
  searchParams: { query },
}: SearchPageProps) {
  const productItems = await prisma.products.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });

  if (productItems.length === 0) {
    return <div className="text-center">No products found</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {productItems.map((productItem) => (
        <ProductCard product={productItem} key={productItem.id} />
      ))}
    </div>
  );
}