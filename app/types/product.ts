export interface BaseProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  location: string;
  isDeal: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MobileProduct extends BaseProduct {
  category: 'mobile';
  data: string;
}

export interface InternetProduct extends BaseProduct {
  category: 'internet';
  speed: string;
}

export interface TVProduct extends BaseProduct {
  category: 'tv';
  channels: string;
}

export interface SecurityProduct extends BaseProduct {
  category: 'security';
}

export interface AccessoryProduct extends BaseProduct {
  category: 'accessories';
  imageUrl: string;
}

export type Product = 
  | MobileProduct 
  | InternetProduct 
  | TVProduct 
  | SecurityProduct 
  | AccessoryProduct;

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  features: string[];
  location: string;
  isDeal: boolean;
  active: boolean;
  data?: string;
  speed?: string;
  channels?: string;
  imageUrl?: string | null;
  imageFile?: File;
} 