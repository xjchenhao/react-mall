import router from 'umi/router';
import styles from "./index.less";

export default function ProductList(props) {
  function jumpToProductDetail(id) {
    router.push(`/product/detail?id=${id}`);
  }

  const { list = [] } = props;

  const List=()=>{
    if(list.length===0){
      return <div>暂无数据</div>
    }

    return list.map(item => (
      <div
        key={item._id}
        className={styles.item}
        onClick={() => jumpToProductDetail(item._id)}
      >
        <div className={styles.left}>
          <img className={styles.img} moda="scaleToFill" loading="lazy" src={item.banner[0]} alt="封面图" />
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{item.name}</div>
          <div className={styles.info}>
            <div className={styles.price}>
              <div className={styles.rmbsymbol}>¥</div>
              {!!item.unifiedPrice && item.unifiedPrice.toFixed(2)}
              <div className={styles.original}>
                {!!item.originalPrice && item.originalPrice.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  }

  return (
    <div className={styles.container}>
      <List />
    </div>
  );
}
