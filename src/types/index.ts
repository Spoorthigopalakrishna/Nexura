export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  supplier: string;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  email: string;
}

export type Priority = 'Low' | 'Normal' | 'High' | 'Critical';
