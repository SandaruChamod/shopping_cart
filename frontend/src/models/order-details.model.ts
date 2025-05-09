import { ProductData } from "./product-data.model";

/**
 * Order details model.
 */
export interface OrderDetails {
  productItems: ProductData[],
  subTotalPrice: number,
  discount: number,
  delivery: number,
  totalPrice: number
}
