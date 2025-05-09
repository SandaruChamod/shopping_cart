import { FETCH_PRODUCTS } from "../actions/actions";


/**
 * Initial state object.
 */
const initialState = {
  products: [],
  searchTerm: '',
  productsTotal: 0,
  pageNumber: 1
};

/**
 * Product reducer
 * @param state: any
 * @param action: any
 */
const productReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.productData.products,
        searchTerm: action.productData.searchTerm,
        productsTotal: action.productData.productsTotal,
        pageNumber: action.productData.pageNumber,
      };
  }
  return state;
};

export default productReducer;
