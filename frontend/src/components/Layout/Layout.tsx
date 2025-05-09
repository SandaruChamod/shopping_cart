import React from "react";

import Aux from '../../containers/hoc/Aux';
import MainHeader from "../Navigation/Header/Header";

/**
 * Main Layout component.
 * @param props: any
 * @constructor
 */
const Layout = (props: any) => {

  /**
   * Layout elements.
   */
  return (
    <Aux>
      <MainHeader
        cartList={props.cartList}
      />
      <main>
        {props.children}
      </main>
    </Aux>
  )
};

export default Layout;
