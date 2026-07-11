export type Product = {
  name: string | undefined;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  images: string[];
  rating: {
    rate: number;
    count: number;
  };

  colors: string[];
  sizes: string[];
  badge: string;
};