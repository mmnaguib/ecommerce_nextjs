import { User } from "@prisma/client";

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
  reviews?: IReview[] | null;
  createdAt?: Date | string | null;
}

export interface ImageProps {
  color: string;
  colorCode: string;
  image: string;
}

export interface IReview {
  id: string;
  useId: string;
  rating: number;
  comment: string;
  createAt?: Date | string | null;
  avatar: string;
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
