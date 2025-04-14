import { prisma } from "@/src/lib/db/prisma";
import type { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth/authOptions";

export async function getUser(): Promise<User | null> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  return user;
}
