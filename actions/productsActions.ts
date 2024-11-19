"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProducts = async () => {
  return await prisma.product.findMany();
};

// export const getProductDetails = async ({ id }: { id: string }) => {
//   try {
//     const product = await prisma.product.findUnique({
//       where: {
//         id,
//       },
//       include: {
//         images: true,
//         reviews: true,
//       },
//     });

//     if (!product) {
//       throw new Error(`Product with id ${id} not found`);
//     }

//     return product;
//   } catch (error) {
//     console.error("Error fetching product details:", error);
//     throw new Error("Failed to fetch product details");
//   }
// };
