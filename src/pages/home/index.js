
import ProductList from "../../components/ProductList";

import styles from './index.css';

export default function() {

  const productListProps={
    // list:[{
    //   _id:'123',
    //   banner:'http://www.shangqutong.cn/logo.png',
    //   name:'我是产品名称',
    // }]
  }
  return (
    <div className={styles.content}>
      <div className="list-body">
        <ProductList {...productListProps} />
      </div>
    </div>
  );
}
