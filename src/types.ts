export interface Product {
  id: number;
  image_url: string;
  title: string;
  description: string;
  price: number;
}

export interface ProductRequest {
  page: number,
  amount: number,
  total: number,
  items: Product[]
}