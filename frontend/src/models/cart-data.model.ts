import { OrderDetails } from "./order-details.model";

/**
 * Cart data model.
 */
export interface CartData {
  userId: string,
  orderDetails: OrderDetails
}
