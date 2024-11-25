import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getCurrentUser } from "../../../../actions/getCurrentUser";
import { ImageProps } from "@/interfaces";

interface ProductRequestBody {
  name: string;
  description: string;
  price: string;
  brand: string;
  category: string;
  inStock: number;
  images: ImageProps[];
}

export async function POST(request: Request): Promise<Response> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.error();
    }

    const body: ProductRequestBody = await request.json();
    const { name, description, price, brand, category, inStock, images } = body;

    if (
      !name ||
      !description ||
      !price ||
      !brand ||
      !category ||
      !inStock ||
      !images
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transformedImages = images.map((image) => ({
      color: image.color,
      colorCode: image.colorCode,
      image: image.image,
    }));

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        brand,
        category,
        inStock,
        images: {
          create: transformedImages,
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
