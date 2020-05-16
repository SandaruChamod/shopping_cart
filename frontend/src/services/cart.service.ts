import { CartData } from "../models/cart-data.model";
import { ProductData } from "../models/product-data.model";
import { UserData } from "../models/user-data.model";

import { getFromLocalStorage, setToLocalStorage } from "./local-storage.service";

const defaultCart = {
  userId: '',
  orderDetails: {
    delivery: 0,
    totalPrice: 0,
    discount: 0,
    subTotalPrice: 0,
    productItems: []
  }
};

/**
 * Responsible to return the cart object.
 */
export const getCart = (user: UserData): CartData => {
  if (!!user) {
    const cart = JSON.parse(getFromLocalStorage(`cart_${user.username}`) as string);
    return !cart ? defaultCart : cart;
  }
  return JSON.parse(getFromLocalStorage('cart') as string);
};

/**
 * Responsible to add product to the cart.
 * @param productToAdd: ProductData
 * @param user: UserData
 */
export const addToCart = (productToAdd: ProductData, user: UserData) => {
  let cart = getCart(user);
  const existingProduct = cart.orderDetails.productItems.find((product: ProductData) => {
    return product.productId == productToAdd.productId;
  });
  // Check whether the product already exists.
  if (!!existingProduct) {
    // Update existing product details on cart.
    ++existingProduct.quantity;
    existingProduct.total += existingProduct.price;

    cart.orderDetails.totalPrice += existingProduct.price;
    cart.orderDetails.subTotalPrice += existingProduct.price - cart.orderDetails.delivery - cart.orderDetails.discount;
    setCart(cart, user);
    return;
  }
  // Update new product details on cart.
  productToAdd.quantity ? ++productToAdd.quantity : productToAdd.quantity = 1;
  productToAdd.total ? productToAdd.total += productToAdd.price * productToAdd.quantity : productToAdd.total = productToAdd.price;

  cart.orderDetails.totalPrice += productToAdd.price;
  cart.orderDetails.subTotalPrice += productToAdd.price - cart.orderDetails.delivery - cart.orderDetails.discount;
  cart.orderDetails.productItems.push(productToAdd);
  setCart(cart, user);
};

/**
 * Responsible to update product quantity of the cart.
 * @param productToAdd: ProductData
 * @param quantity: number
 * @param user: UserData
 */
export const updateCart = (productToAdd: ProductData, quantity: number, user: UserData) => {
  let cart = getCart(user);
  const existingProduct = cart.orderDetails.productItems.find((product: ProductData) => {
    return product.productId == productToAdd.productId;
  });
  // Check whether the product already exists.
  if (!!existingProduct) {
    // Check quantity difference.
    let quantityDifference = quantity - existingProduct.quantity;

    // if difference is positive value.
    if (quantityDifference > 0) {
      // Update existing product details on cart.
      const newPrice = existingProduct.price * quantityDifference;
      existingProduct.quantity += quantityDifference;
      existingProduct.total += newPrice;

      cart.orderDetails.totalPrice += newPrice;
      cart.orderDetails.subTotalPrice += newPrice - cart.orderDetails.delivery - cart.orderDetails.discount;
    } else {
      // Update existing product details on cart.
      quantityDifference = existingProduct.quantity - quantity;
      const newPrice = existingProduct.price * quantityDifference;
      existingProduct.quantity -= quantityDifference;
      existingProduct.total -= newPrice;

      cart.orderDetails.totalPrice -= newPrice;
      cart.orderDetails.subTotalPrice -= newPrice - cart.orderDetails.delivery - cart.orderDetails.discount;
    }
    // Save cart
    setCart(cart, user);
    return;
  }
  // Check quantity difference.
  let quantityDifference = quantity - productToAdd.quantity;

  // if difference is positive value.
  if (quantityDifference > 0) {
    // Update new product details on cart.
    const newPrice = productToAdd.price * quantityDifference;
    productToAdd.quantity += quantityDifference;
    productToAdd.total += newPrice;

    cart.orderDetails.totalPrice += newPrice;
    cart.orderDetails.subTotalPrice += newPrice - cart.orderDetails.delivery - cart.orderDetails.discount;
  } else {
    // Update new product details on cart.
    quantityDifference = productToAdd.quantity - quantity;
    const newPrice = productToAdd.price * quantityDifference;
    productToAdd.quantity -= quantityDifference;
    productToAdd.total -= newPrice;

    cart.orderDetails.totalPrice -= newPrice;
    cart.orderDetails.subTotalPrice -= newPrice - cart.orderDetails.delivery - cart.orderDetails.discount;
  }
  // Add new product to cart.
  cart.orderDetails.productItems.push(productToAdd);
  setCart(cart, user);
};

/**
 * Responsible to remove product from the cart.
 * @param productToRemove: ProductData
 * @param user: UserData
 */
export const removeProduct = (productToRemove: ProductData, user: UserData) => {
  let cart = getCart(user);
  cart.orderDetails.productItems =
    cart.orderDetails.productItems.filter((product: ProductData) => {
      return product.productId !== productToRemove.productId;
    });
  cart.orderDetails.totalPrice -= productToRemove.total;
  cart.orderDetails.subTotalPrice -= productToRemove.total - cart.orderDetails.delivery - cart.orderDetails.discount;
  setCart(cart, user);
};

/**
 * Responsible to save the cart in local storage.
 * @param cart: CartData
 * @param user: UserData
 */
export const setCart = (cart: CartData, user: UserData) => {
  let cartIdentifier = 'cart';
  if (!!user) {
    cartIdentifier = cartIdentifier.concat(`_${user.username}`)
  }
  setToLocalStorage(cartIdentifier, JSON.stringify(cart));
};

/**
 * Responsible to return cart item count.
 */
export const getCartItemCount = (user: UserData) => {
  const cart = getCart(user);
  let count = 0;
  if (!!cart) {
    cart.orderDetails.productItems.map((product: ProductData) => {
      count += product.quantity;
    });
  }
  return count;
};
