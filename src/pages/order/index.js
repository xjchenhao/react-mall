import React, { PureComponent } from 'react';
import ProductList from "../../components/ProductList";
import { NavBar, Icon } from 'antd-mobile';
import router from 'umi/router';

import { connect } from "dva";

import styles from './index.css';

@connect(({ order }) => ({
  order,
}))
class Order extends PureComponent {
  componentWillMount() {
    const { dispatch,order:{list} } = this.props;

    if(!list.length){
      dispatch({
        type: 'order/getList',
        payload: {
          currentPage:1,
          pageSize:20,
        },
      });
    }
  }

  handleBack() {
    router.goBack();
  }

  render() {
    const { order } = this.props;

    const productListProps={
      list:order.list.map(item=>item.product),
    }

    return (
      <div className={styles.content}>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => this.handleBack()}
      >
        订购历史
      </NavBar>
        <div className={styles.listBody}>
          <ProductList {...productListProps} />
        </div>
      </div>
    );
  }
}

export default Order;
