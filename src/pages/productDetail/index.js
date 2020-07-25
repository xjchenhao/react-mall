import React, { PureComponent } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { NavBar, Icon, Carousel, Flex, WhiteSpace } from 'antd-mobile';
import { ShoppingCartOutlined } from '@ant-design/icons';
import styles from './index.less';

@connect(({ product }) => ({
  product,
}))
class ProductDetail extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    const { id: productId } = this.props.location.query;

    dispatch({
      type: 'product/getDetail',
      payload: {
        id: productId,
      },
    });
  }

  handleBack() {
    router.goBack();
  }

  render() {
    const product = this.props.product.detail;
    const bannerList = product.banner || [];

    return (
      <div className={styles.countent}>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.handleBack()}
          rightContent={[
            <ShoppingCartOutlined key="shoppingCart" style={{ fontSize: '.32rem' }} />,
          ]}
        >
          产品详情
        </NavBar>
        <Carousel autoplay={false} infinite>
          {bannerList.map(item => (
            <img src={item} key={item} alt="产品轮播图" className={styles.bannerImg} />
          ))}
        </Carousel>
        <div className={styles.info}>
          <div className={styles.title}>{product.name}</div>
          <WhiteSpace size="lg" />
          <Flex align="end">
            <Flex.Item>
              <div className={styles.price}>
                <div className={styles.rmbsymbol}>¥</div>
                {!!product.unifiedPrice && product.unifiedPrice.toFixed(2)}
                <div className={styles.original}>
                  {!!product.originalPrice && product.originalPrice.toFixed(2)}
                </div>
              </div>
            </Flex.Item>
            <Flex.Item>
              <div className={styles.quantity}>库存：{product.quantity}</div>
            </Flex.Item>
          </Flex>
        </div>
        <div className={styles.introduce} dangerouslySetInnerHTML={{__html:product.content}}></div>
      </div>
    );
  }
}

export default ProductDetail;
