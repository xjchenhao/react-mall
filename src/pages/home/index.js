import React, { PureComponent } from 'react';
import ProductList from "../../components/ProductList";

import { connect } from "dva";

import styles from './index.css';


@connect(({ product }) => ({
  product,
}))
class Home extends PureComponent {
  componentDidMount() {
    const { dispatch,product:{list} } = this.props;

    if(!list.length){

      dispatch({
        type: 'product/getList',
        payload: {
          currentPage:1,
          pageSize:20,
        },
      });
    }
  }

  render() {
    const { product } = this.props;

    const productListProps={
      list:product.list,
      currentPage:product.currentPage,
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
