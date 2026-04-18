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
  role?: string;
}

export type Priority = 'Low' | 'Normal' | 'High' | 'Critical';

export type POStatus = 'Generated' | 'Blockchain_Recorded' | 'Dispatched' | 'Acknowledged' | 'Order_Confirmed' | 'In_Production' | 'Shipped' | 'Delivered';

export interface BlockchainRecord {
  txHash: string;
  blockNumber: number;
  network: string;
  timestamp: string;
  contractAddress: string;
}

export interface Requisition {
  id: string;
  items: CartItem[];
  totalAmount: number;
}

export interface PurchaseOrder {
  id: string;
  requisitionId: string;
  vendor: string;
  items: CartItem[];
  totalAmount: number;
  termsAndConditions: string;
  status: POStatus;
  createdAt: string;
  blockchain: BlockchainRecord;
  dispatchedAt?: string;
  acknowledgedAt?: string;
  documents?: { name: string; url: string; addedAt: string }[];
}
