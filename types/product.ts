export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  specs: {
    display: string;
    processor: string;
    ram: string;
    storage: string;
    camera: string;
    battery: string;
    os: string;
  };
  features: string[];
  inStock: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}