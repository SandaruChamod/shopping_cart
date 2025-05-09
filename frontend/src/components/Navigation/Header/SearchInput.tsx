import React from "react";

import { useDispatch } from "react-redux";

import { fetchProducts } from "../../../store/actions/product-actions";

import Search from "antd/es/input/Search";

/**
 * Search input component.
 * @param props: any
 * @constructor
 */
const SearchInput = (props: any) => {
  const dispatch = useDispatch();

  /**
   * On search event handler.
   * @param searchText
   */
  const onSearch = (searchText: string) => {
    dispatch(fetchProducts(searchText, 1))
  };

  /**
   * Search input elements.
   */
  return (
    <div>
      <Search
        style={{width: "500px"}}
        placeholder={'Search products here...'}
        onSearch={onSearch}
      />
    </div>
  )
};

export default SearchInput;
