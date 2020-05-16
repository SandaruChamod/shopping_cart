import axios from "../axios";

import { CartData } from "../models/cart-data.model";
import { UserData } from "../models/user-data.model";

import { getFromLocalStorage } from "./local-storage.service";

/**
 * Responsible for making POST call to save an order.
 * @param cart: CartData
 */
export const makeOrder = async (cart: CartData): Promise<any> => {
  const user: UserData = JSON.parse(getFromLocalStorage('user') as string);
  if (!!user && user.userId) {
    cart.userId = user.userId;
    const response = await axios.post('/order', cart);
    return response.data;
  }
};
