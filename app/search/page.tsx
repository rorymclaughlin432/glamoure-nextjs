import ProductCard from "@/components/ProductCard";
import { prisma } from "@/src/lib/db/prisma";
import { Metadata } from "next";

// Define the SearchPageProps interface with the correct type for searchParams
interface SearchPageProps {
  searchParams: Promise<{
    query?: string;
  }>;
}

/*
  Uncomment and fix generateMetadata if you want to use it
export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  searchParams = await searchParams; // Await the searchParams promise
  const query = searchParams?.query || "Search";

  return {
    title: `Search: ${query} - Glamouré`,
  };
}
*/

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || "";

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
