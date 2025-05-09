import { prisma } from "@/src/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth/authOptions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function admin(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-center text-lg text-red-500">
          You must be logged in to view your orders.
        </p>
      </div>
    );
  }
  // Check if the user is an admin
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email || "" },
  });

  if (!user?.isAdmin) {
    redirect("/access-denied");
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-center text-lg text-red-500">
          You must be logged in to view your orders.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">
        {" "}
        {user.name}&#39;s Admin Dashboard
      </h1>

      <p className="mb-4 text-lg">
        Manage your store settings and view analytics.
      </p>
      <p className="mb-4 text-lg">You can add products to the site.</p>
      <Link href="/admin/add-product" className="btn btn-primary mb-4">
        Add Product
      </Link>
    </div>
  );
}
