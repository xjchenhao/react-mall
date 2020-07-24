import "./index.less";

export default function ProductList(props) {
  function jumpToProductDetail(id) {
    // Taro.navigateTo({
    //   url: `/pages/aPages/productDetail/index?id=${id}`
    // });
  }

  const { list = [] } = props;
  // console.log(list);

  return (
    <div className="container">
      {list.map(item => (
        <div
          key={item._id}
          className="item"
          onClick={() => jumpToProductDetail(item._id)}
        >
          <div className="left">
            <img className="img" moda="scaleToFill" src={item.banner[0]} alt="封面图" />
          </div>
          <div className="right">
            <div className="title">{item.name}</div>
            <div className="address">
              {item.city + item.district + item.address}
            </div>
            <div className="info">
              <div className="price">
                <div className="rmb-symbol">¥</div>
                {!!item.displayPrice && item.displayPrice.toFixed(2)}
                <div class="original">
                  {!!item.originalPrice && item.originalPrice.toFixed(2)}
                </div>
              </div>
              <div className="distance">
                {!!item.distance
                  ? `距您${(item.distance / 1000).toFixed(1)}km`
                  : ""}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
