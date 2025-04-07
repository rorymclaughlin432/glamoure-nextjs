import { prisma } from "@/src/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import PaginationBar from "@/components/PaginationBar";
import { Metadata } from "next";
interface HomePageProps {
  searchParams: { page: string };
}


export default async function Home({
  searchParams,
}: HomePageProps) {
  searchParams = await searchParams;
  const pageParam = await searchParams?.page;
  const currentPage = parseInt(
    Array.isArray(pageParam) ? pageParam[0] : pageParam || "1",
    10
  );

  const pageSize = 6;
  const heroItemCount = 1;

  const totalItemCount = await prisma.products.count();
  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const productsItems = await prisma.products.findMany({
    orderBy: { id: "desc" },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });

  return (
    <div className="flex flex-col items-center">
      {currentPage === 1 && (
        <div className="hero rounded-xl bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src={productsItems[0].imageUrl}
              alt={productsItems[0].name}
              width={400}
              height={800}
              className="w-full max-w-sm rounded-lg shadow-2xl"
              priority
            />
            <div>
              <h1 className="text-5xl font-bold">{productsItems[0].name}</h1>
              <p className="py-6">{productsItems[0].description}</p>
              <Link
                href={`/products/${productsItems[0].id}`}
                className="btn btn-success btn-outline"
              >
                Check it Out
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(currentPage === 1 ? productsItems.slice(1) : productsItems).map(
          (product) => (
            <ProductCard product={product} key={product.id} />
          )
        )}
      </div>
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}