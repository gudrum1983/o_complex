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

export type CartItem = Pick<Product, "title" | "price" | "id"> & {count?: number, totalPrice?: number};


// Тип контекста
export interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  phone: string;
  setPhone: (phone: string) => void;
}

/*
{
  "phone": "79163452487",
  "cart": [
  {
    "id": 12,
    "quantity": 2
  },
  {
    "id": 15,
    "quantity": 5
  }
]
}*/
