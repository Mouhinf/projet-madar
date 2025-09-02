export interface ProductVariant {
  id: string;
  size: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  subcategory?: string;
  description: string;
  image: string;
  dataAiHint: string;
  variants: ProductVariant[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  name: string;
  variantSize: string;
  price: number;
  image: string;
  dataAiHint: string;
}

export const categories = [
  "Détergents en poudre",
  "Liquides vaisselle",
  "Eaux de Javel",
  "Savons",
  "Lave-mains et gels corporels",
  "Désodorisants",
  "Produits complémentaires",
] as const;

export type Category = (typeof categories)[number];
