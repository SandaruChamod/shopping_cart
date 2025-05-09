import React from "react";
import { useSelector } from "react-redux";

import { Button, Card, Col, message, Rate, Row } from "antd";

import { Meta } from "antd/es/list/Item";

import { UserData } from "../../../models/user-data.model";

import { rateProduct } from "../../../services/product.service";

import './Product.css';

/**
 * Product component.
 * @param props: any
 * @constructor
 */
const Product = (props: any) => {
  const user: UserData = useSelector((state: any) => state.auth.userProfile);

  /**
   * Rate product handler.
   * @param value
   */
  const rateProductItem = (value: any) => {
    if (!user) {
      message.error('Please login first to rate products.');
      return;
    }
    rateProduct(props.item, value);
  };

  /**
   * Product elements.
   */
  return (
    <Col span={6}>
      <Card className="product-card"
            hoverable
            style={{width: 240}}
            cover={<img className="product-img" alt="example"
                        src={props.item.imageUrl}/>}
      >

        <Meta title={props.item.productName} description={`Rs: ${props.item.price}/=`}
              style={{margin: '5px'}}/>
        <Meta description={props.item.description}
              style={{margin: '5px'}}/>
        <Row>
          <Button key="add_to_cart"
                  type="primary"
                  style={{margin: '1px'}}
                  onClick={() => {
                    props.addToCart(props.item)
                  }}>
            Add to cart</Button>
        </Row>
        <Row justify="center">
          <Rate allowClear allowHalf
                defaultValue={props.item.rating}
                onChange={rateProductItem}/>
        </Row>
      </Card>
    </Col>);
};

export default Product;
