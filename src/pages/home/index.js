import React, { useState,useEffect} from 'react';
import ProductList from "../../components/ProductList";

import { connect } from "dva";

import styles from './index.css';

const Home=props=>{
  const { dispatch,product } = props;
  const {currentPage,setCurrentPage}=useState(1)

  const productListProps={
    list:product.list,
    currentPage:product.currentPage,
  }

  useEffect(()=>{
    if(!currentPage||currentPage<=product.currentPage){
      dispatch({
        type: 'product/getList',
        payload: {
          currentPage:1,
          pageSize:20,
        },
      });
    }

  },[currentPage, dispatch, product.currentPage])
  return (
    <div className={styles.content}>
      <div className="list-body">
        <ProductList {...productListProps} />
      </div>
    </div>
  );
}

export default connect(({ product }) => ({
  product,
}))(Home);
