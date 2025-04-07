
import NextAuth from "next-auth";
import { authOptions } from "@/src/lib/auth/authOptions";

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
