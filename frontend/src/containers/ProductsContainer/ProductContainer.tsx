import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { UserData } from "../../models/user-data.model";

import { getCartItemCount } from "../../services/cart.service";

import Products from "../../components/Products/Products";
import Layout from "../../components/Layout/Layout";
import Aux from '../../containers/hoc/Aux';

/**
 * Product container component.
 * @param props: any
 * @constructor
 */
const ProductContainer = (props: any) => {
  const user: UserData = useSelector((state: any) => state.auth.userProfile);
  // Responsible to keep and update state of cart list.
  const [cartList, setCartList] = useState(0);

  /**
   * Use effect handler.
   */
  useEffect(() => {
    setCartList(getCartItemCount(user));
  });

  /**
   * Update cart handler.
   */
  const updateCart = () => {
    setCartList(getCartItemCount(user));
  };

  /**
   * Products container elements.
   */
  return (
    <Layout cartList={cartList}>
      <Aux>
        <Products onCartListChange={updateCart}/>
      </Aux>
    </Layout>
  );
};

export default ProductContainer;
