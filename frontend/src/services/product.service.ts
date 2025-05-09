import axios from '../axios';

import { ProductData } from "../models/product-data.model";

import { getFromLocalStorage } from "./local-storage.service";

/**
 * Responsible to make GET call to get products.
 * @param searchString
 * @param pageNumber
 */
export const getProducts = async (searchString: string, pageNumber: number): Promise<any> => {
  let requestUrl = `product?query=${searchString}`;
  if (!!pageNumber) {
    requestUrl = requestUrl.concat(`&page=${pageNumber}`)
  }
  const response = await axios.get(requestUrl);
  return response.data;
};

/**
 * Responsible for make POST call to rate a product.
 * @param product
 * @param rating
 */
export function rateProduct(product: ProductData, rating: number) {
  const user = JSON.parse(getFromLocalStorage('user') as string);
  if (!!user) {
    axios.post('/product/rate', {
      productId: product.productId,
      userId: user.userId,
      rating: rating
    }).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    });
  }
}
