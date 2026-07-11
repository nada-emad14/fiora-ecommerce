import type { Product } from "./product";

export type CartItem = Product & {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
};