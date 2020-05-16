/**
 * Product data model.
 */
export interface ProductData {
  createdDate?: string;
  updatedDate?: string;
  productId: string;
  productName: string;
  description: string;
  imageUrl: string;
  price: number;
  discount: number;
  quantity: number;
  total: number;
  rating: number;
}
