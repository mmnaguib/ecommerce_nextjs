import { JsonValue } from "@prisma/client/runtime/library";

export interface IProduct {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  brand: string;
  category: string;
  inStock: boolean;
  images: {
    color: string;
    colorCode: string;
    image: string;
  }[];
  reviews?: any[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface Image {
  color: string;
  colorCode: string;
  image: string;
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

export interface ICartItem {
  id: string;
  cartId: string;
  cart?: ICart;
  productId: string;
  product?: IProduct;
  quantity: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
