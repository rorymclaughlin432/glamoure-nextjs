import { prisma } from "@/src/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth/authOptions";

export default async function OrdersPage() {
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

  const userId = session.user.id;

  // Fetch orders for the logged-in user
  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <h2 className="text-lg font-semibold mb-2">
                Order ID: {order.id}
              </h2>
              <p className="text-sm text-gray-500">
                Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Payment Status:{" "}
                <span
                  className={`font-semibold ${
                    order.paymentStatus === "Paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Total Amount: ${order.totalAmount.toFixed(2)}
              </p>

              <div className="mt-4">
                <h3 className="font-semibold">Items:</h3>
                <ul className="list-disc list-inside">
                {Array.isArray(order.items) &&
                    order.items.map((item: any, index: number) => (
                      <li key={index}>
                        {item.name} - Quantity: {item.quantity}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}