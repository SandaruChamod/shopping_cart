import { FETCH_PRODUCTS } from "./actions";
import { getProducts } from "../../services/product.service";


/**
 * Login action.
 * @param searchTerm: any
 * @param pageNumber: number
 */
export const fetchProducts = (searchTerm: any, pageNumber: number) => {
  return (dispatch: (arg0: { type: string; productData: any; }) => void) => {
    return getProducts(searchTerm, pageNumber).then((response) => {
      dispatch({
        type: FETCH_PRODUCTS,
        productData: {
          products: response.products,
          searchTerm: searchTerm,
          productsTotal: response.listLength,
          pageNumber: pageNumber,
        }
      });
    }).catch((err) => {
      console.log(err);
    });
  }
};
