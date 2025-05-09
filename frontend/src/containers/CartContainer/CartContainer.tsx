import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Col, List, Row, Layout, Button, Divider, message } from "antd";

import { ProductData } from "../../models/product-data.model";

import { makeOrder } from "../../services/order.service";
import { getCart, removeProduct, updateCart } from "../../services/cart.service";
import MainLayout from "../../components/Layout/Layout";

import Aux from "../hoc/Aux";
import CartItem from "../../components/Cart/CartItem/CartItem";

import './CartContainer.css';
import { UserData } from "../../models/user-data.model";

const {Sider} = Layout;

/**
 * Cart container component.
 * @param props: any
 * @constructor
 */
const CartContainer = (props: any) => {
  const user: UserData = useSelector((state: any) => state.auth.userProfile);
  // Responsible for keep and set state of the cart object.
  const [cart, setCart] = useState(getCart(user));

  /**
   * Product remove handler.
   * @param product
   */
  const onProductRemove = (product: ProductData) => {
    removeProduct(product, user);
    setCart(getCart(user));
  };

  /**
   * Quantity change handler.
   * @param item
   * @param value
   */
  const onQuantityChange = (item: any, value: number) => {
    updateCart(item, value, user);
    setCart(getCart(user));
  };

  /**
   * Checkout handler.
   */
  const onCheckout = () => {
    if (!user) {
      message.error('Please login to place your order.');
      return;
    }
    makeOrder(cart).then((response) => {
      if (response.status === 'success') {
        message.success("You have placed the order successfully");
      } else {
        message.error(response.message);
      }
    });
  };

  /**
   * Cart container elements.
   */
  return (
    <MainLayout>
      <Aux>
        <Row gutter={30}>
          <Col span={18}>
            <div className="cart-items">
              {cart.orderDetails.productItems.length ?
                <List
                  grid={{gutter: 16, column: 1}}
                  itemLayout="horizontal"
                  dataSource={cart.orderDetails.productItems}
                  renderItem={product => (
                    <List.Item>
                      <CartItem
                        item={product}
                        quantity={product.quantity}
                        totalPrice={product.total}
                        onCartChange={onQuantityChange}
                        onDelete={onProductRemove}
                      />
                    </List.Item>
                  )}
                /> : <div className="no-products">No products to show in the cart.</div>}
            </div>
          </Col>
          <Sider width={315}>
            <div className="info-box">
              <div style={{backgroundColor: "whitesmoke", color: "black", padding: "1rem"}}>
                <Row>
                  <Col span={12}>Sub Total</Col>
                  <Col span={12}>{cart.orderDetails.subTotalPrice} LKR </Col>
                </Row>
                <Divider/>
                <Row>
                  <Col span={12}>Discount</Col>
                  <Col span={12}>{cart.orderDetails.discount} LKR </Col>
                </Row>
                <Divider/>
                <Row>
                  <Col span={12}>Delivery</Col>
                  <Col span={12}>{cart.orderDetails.delivery} LKR</Col>
                </Row>
                <Divider/>
                <Row>
                  <Col span={12}>Total</Col>
                  <Col span={12}>{cart.orderDetails.totalPrice} LKR </Col>
                </Row>
              </div>
              <Row justify="center">
                <Button className="checkout-btn" onClick={onCheckout}>
                  Checkout
                </Button>
              </Row>

              <Divider/>
              <Row justify="center">
                <Link to="/">
                  <Button className="continue-shopping-btn">
                    Continue Shopping
                  </Button>
                </Link>
              </Row>
            </div>
          </Sider>
        </Row>
      </Aux>
    </MainLayout>);
};

export default CartContainer;
