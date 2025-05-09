import FormSubmitButton from "@/components/FormSubmitButton";
import { addProduct } from "./actions"; // Import the server action
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth/authOptions";
import { prisma } from "@/src/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add Product - Glamouré",
};

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