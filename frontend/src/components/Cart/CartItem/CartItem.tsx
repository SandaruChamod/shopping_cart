import React, { useState } from "react";

import { Button, Col, InputNumber, Row } from "antd";
import { CloseOutlined } from '@ant-design/icons';

/**
 * Cart item component.
 * @param props: any
 * @constructor
 */
const CartItem = (props: any) => {
  // responsible to track and set order quantity.
  const [orderQuantity, setOrderQuantity] = useState(props.quantity);

  /**
   * product delete handler.
   */
  const onProductDelete = () => {
    props.onDelete(props.item);
  };

  /**
   * order amount change handler.
   */
  const onOrderAmountChange = (value: any) => {
    setOrderQuantity(value);
    props.onCartChange(props.item, value);
  };

  /**
   * Cart item elements.
   */
  return (
    <Row style={{width: "100%", border: "1px solid #ccc"}} align="middle">
      <Col flex={1}>
        <div className="item-img">
          <img width="150px" alt="product" src={props.item.imageUrl}></img>
        </div>
      </Col>
      <Col flex={10}>
        <Row>
          <Col span={12}>
            <div className="item-title">
              <h3>{props.item.productName}</h3>
            </div>
            <div className="item-price">{props.item.price} LKR</div>
          </Col>
          <Col span={5}>
            <label>
              Qty:
              <InputNumber contentEditable={false} id="item-qty" min={1} max={100} value={orderQuantity}
                           onChange={onOrderAmountChange}/>
            </label>

          </Col>
          <Col span={5}>
            <div className="item-total">{props.totalPrice} LKR</div>
          </Col>
          <Col span={2}>
            <Button type="link" danger icon={<CloseOutlined style={{fontSize: "20px"}}/>}
                    onClick={onProductDelete}></Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CartItem;
