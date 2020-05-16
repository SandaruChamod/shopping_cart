import React from "react";
import { Link } from "react-router-dom";

import { Button, Col, Layout, Row, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import LoginButton from "../../Login/LoginButton/LoginButton";
import SearchInput from "./SearchInput";

const {Header} = Layout;

/**
 * Main Header component.
 * @param props
 * @constructor
 */
const MainHeader = (props: any) => {

  /**
   * Main header elements.
   */
  return (
    <Header style={{backgroundColor: "#000000"}}>
      <Row>
        <Col span={3}>
          <Link to={'/'}>
            <img height={50} width={50} src="https://bit.ly/2wVyYo0"/>
            <span style={{color: "white", fontWeight: "bold", cursor: "pointer"}}>hopping Mart</span>
          </Link>
        </Col>
        <Col span={1}/>
        <Col span={3}>
          <SearchInput/>
        </Col>
        <Col span={11}/>
        <Col span={4} style={{textAlign: 'right'}}>
          <LoginButton/>
        </Col>
        <Col span={2} style={{textAlign: 'left'}}>
          <Link to="/cart">
            <Badge count={props.cartList}>
              <Button key="cart" style={{marginLeft: '1rem'}} onClick={() => {
              }}>
                <ShoppingCartOutlined/>
              </Button>
            </Badge>
          </Link>
        </Col>
      </Row>
    </Header>
  );
};

export default MainHeader;
