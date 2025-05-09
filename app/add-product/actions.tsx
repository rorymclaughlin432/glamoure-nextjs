"use server";

import { prisma } from "@/src/lib/db/prisma";
import { redirect } from "next/navigation";
import { authOptions } from "@/src/lib/auth/authOptions";
import { getServerSession } from "next-auth";

export async function addProduct(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  // Check if the user is an admin
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email || "" },
  });

  if (!user?.isAdmin) {
    redirect("/access-denied");
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw new Error("All fields are required.");
  }

  await prisma.products.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  });

  redirect("/admin");
}