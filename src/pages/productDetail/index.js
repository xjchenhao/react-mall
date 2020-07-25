import React, { PureComponent } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { NavBar, Icon, Carousel, Flex, WhiteSpace, Modal } from 'antd-mobile';
import { ShoppingCartOutlined } from '@ant-design/icons';
import styles from './index.less';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

let connection;
@connect(({ productDetail }) => ({
  productDetail,
}))
class ProductDetail extends PureComponent {
  state = {
    price: undefined,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    const { id: productId } = this.props.location.query;

    connection = new HubConnectionBuilder()
      .withUrl('/api/signalr')
      .configureLogging(LogLevel.Information)
      .build();

    connection.on('updateProductPrice', value => {
      this.setState({
        price: value,
      });
    });

    connection.start();

    dispatch({
      type: 'productDetail/getDetail',
      payload: {
        id: productId,
      },
    });
  }

  componentWillUnmount() {
    connection.off();
    connection.stop();
    connection.completeClose()
  }

  handleBuy() {
    const { dispatch } = this.props;
    const { id: productId } = this.props.location.query;

    Modal.alert('确认购买', '将直接创建订单', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确认',
        onPress: () => {
          dispatch({
            type: 'productDetail/buy',
            payload: {
              productId: productId,
            },
          });
        },
      },
    ]);
  }

  handleBack() {
    router.goBack();
  }

  render() {
    const product = this.props.productDetail.detail;
    const bannerList = product.banner || [];

    const price = this.state.price ? this.state.price : (!!product.unifiedPrice&&product.unifiedPrice.toFixed(2));

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
                {price}
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
        <div
          className={styles.introduce}
          dangerouslySetInnerHTML={{ __html: product.content }}
        ></div>
        <div className={styles.operation}>
          <div className={styles.shoppingCartBtn}>加入购物车</div>
          <div
            className={styles.buyBtn}
            onClick={() => {
              this.handleBuy();
            }}
          >
            立即购买
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
