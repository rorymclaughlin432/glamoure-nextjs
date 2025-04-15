import { prisma } from "@/src/lib/db/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import PriceTag from "@/components/PriceTag";
import { Metadata } from "next";
import { cache } from "react";
import AddToCartButton from "./AddToCartButton";
import { incrementProductQuantity } from "./actions";

export const dynamic = "force-dynamic"; // 👈 REQUIRED to access params in generateMetadata

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.products.findUnique({ where: { id } });
  if (!product) {
    notFound();
  }
  return product;
});

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  return {
    title: `${product.name} - Commence`,
    description: product.description,
    metadataBase: new URL("http://localhost:3000/"),
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center shadow-lg p-4 bg-base-200 rounded-lg">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg shadow-2xl"
        priority
      />
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={Number(product.price)} classname="mt-4" />
        <p className="py-6">{product.description}</p>
        <AddToCartButton
          productId={product.id}
          incrementProductQuantity={incrementProductQuantity}
        />
      </div>
    </div>
  );
}
