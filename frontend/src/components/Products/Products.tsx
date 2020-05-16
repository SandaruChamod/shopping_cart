import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Layout, List, Pagination, Row } from "antd";

import { ProductData } from '../../models/product-data.model';
import { UserData } from "../../models/user-data.model";

import { addToCart } from "../../services/cart.service";

import Product from './Product/Product';

import { fetchProducts } from "../../store/actions/product-actions";

import './Products.css';

const {Content, Footer} = Layout;

/**
 * Products component.
 * @param props
 * @constructor
 */
const Products = (props: any) => {
  const user: UserData = useSelector((state: any) => state.auth.userProfile);
  const products = useSelector((state: any): ProductData[] => state.product.products);
  const searchTerm = useSelector((state: any): string => state.product.searchTerm);
  const productsTotal = useSelector((state: any): number => state.product.productsTotal);
  const pageNumber = useSelector((state: any): number => state.product.pageNumber);

  const dispatch = useDispatch();

  /**
   * Use effects handlers.
   */
  useEffect(() => {
    if (!searchTerm && pageNumber === 1) {
      dispatch(fetchProducts('', +pageNumber));
    }
  }, [dispatch]);

  /**
   * Add to cart handler.
   * @param product: ProductData
   */
  const addProductToCart = (product: ProductData) => {
    addToCart(product, user);
    props.onCartListChange();
  };

  /**
   * Page change handler.
   * @param pageIndex
   */
  const onPageChange = (pageIndex: any) => {
    dispatch(fetchProducts('', pageIndex))
  };

  /**
   * Products elements.
   */
  return (
    <Layout className="page-wrapper">
      <div className='layout-content'>
        <Content style={{padding: '0 50px'}}>
          <div className="card-wrapper">

            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 4,
                xxl: 4,
              }}
              dataSource={products}
              renderItem={item => (
                <List.Item>
                  <Product item={item} addToCart={addProductToCart}/>
                </List.Item>
              )}
            />
            <Row justify="center">
              <Pagination
                defaultCurrent={1}
                current={pageNumber}
                pageSize={4}
                onChange={onPageChange}
                total={productsTotal}
              />
            </Row>
          </div>
        </Content>
      </div>
      <Footer style={{textAlign: 'center', backgroundColor: 'black', color: 'white', maxHeight: '40px'}}>All rights
        received ©2020</Footer>
    </Layout>
  );
};

export default Products;
