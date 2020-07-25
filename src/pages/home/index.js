import React, { PureComponent } from 'react';
import ProductList from "../../components/ProductList";

import { connect } from "dva";

import styles from './index.css';

@connect(({ productList }) => ({
  productList,
}))
class Home extends PureComponent {
  componentWillMount() {
    const { dispatch,productList:{list} } = this.props;

    if(!list.length){
      dispatch({
        type: 'productList/getList',
        payload: {
          currentPage:1,
          pageSize:20,
        },
      });
    }
  }

  render() {
    const { productList } = this.props;

    const productListProps={
      list:productList.list,
      currentPage:productList.currentPage,
    }

    return (
      <div className={styles.content}>
        <div className="list-body">
          <ProductList {...productListProps} />
        </div>
      </div>
    );
  }
}

export default Home;
