/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProduct {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  categoryId: string;
  stock: number;
  images: ImageProps[] | any;
  reviews: IReview[] | any;
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
  categoryId: string;
  stock: number;
  image: ImageProps;
  quantity: number;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  hashedPassword?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  role: Role;
  orders: IOrder[];
  cart?: ICart;
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface IOrder {
  id: string;
  userId: string;
  user?: IUser;
  items: IOrderItem[];
  totalAmount: number;
  status: "Pending" | "Completed" | "Canceled";
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface IOrderItem {
  id: string;
  orderId: string;
  order?: IOrder;
  productId: string;
  product?: IProduct;
  quantity: number;
  price: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface ICart {
  id: string;
  userId: string;
  user?: IUser;
  items: ICartItem[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
