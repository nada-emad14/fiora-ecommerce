import type { Product } from "../types/product";

const BASE_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await response.json();

  return products.map((product: Product) => ({
    ...product,

    images: [product.image, product.image, product.image],
    
    colors: ["Black", "White", "Blue"],

    sizes: ["S", "M", "L", "XL"],

    badge:
      product.rating.rate >= 4.5
        ? "Best Seller"
        : product.rating.rate >= 4
          ? "Popular"
          : "New",
  }));
}
