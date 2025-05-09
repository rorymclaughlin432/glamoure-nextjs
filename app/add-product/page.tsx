"use server";

import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/src/lib/db/prisma";
import { redirect } from "next/navigation";
import { authOptions } from "@/src/lib/auth/authOptions";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Add Product - Glamouré",
};

async function addProduct(formData: FormData) {


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
    return {
      status: 400,
      body: {
        error: "Please fill in all fields",
      },
    };
  }

  await prisma.products.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  });

  redirect("/");
}

export default async function AddProductPage() {
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

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input input-bordered mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image Url"
          type="url"
          className="input input-bordered mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input input-bordered mb-3 w-full"
        />
        <FormSubmitButton className={`btn btn-info`}>
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}
