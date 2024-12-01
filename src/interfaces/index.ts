import { User } from "@prisma/client";
import { IconType } from "react-icons";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProduct {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  category: string;
  inStock: number;
  brand: string;
  images: ImageProps[];
  createdAt?: Date | string | null;
}

export interface ImageProps {
  color: string;
  colorCode: string;
  image: string;
}

export interface IReview {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createAt?: Date | string | null;
  user: IUser;
}

export interface ICartItem {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  category: string;
  inStock: number;
  image: ImageProps;
  quantity: number;
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  image?: string;
  hashedPassword?: string;
  role: Role;
}

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  emailVerified: string | null;
  createdAt: string;
  updatedAt: string;
};

export interface ICategory {
  id: string;
  name: string;
}

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};
