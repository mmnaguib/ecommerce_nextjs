import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";


export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email"},
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials.password) {
            throw new Error("Invalid email or password");
            }

            const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            });

            if (!user) {
            throw new Error("No user found with the given email");
            }

            // تحقق من كلمة المرور (تحتاج إلى مكتبة مثل bcrypt)
            const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
            );

            if (!isPasswordValid) {
            throw new Error("Invalid email or password");
            }

            return user;
        },
        }),
  ],
});
