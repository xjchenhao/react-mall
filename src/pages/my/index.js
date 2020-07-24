import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { List } from 'antd-mobile';

import styles from './index.css';

const Item = List.Item;

@connect(({ my }) => ({
  my,
}))
class My extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'my/getUserInfo',
      payload: {},
    });
  }

  handleLogout() {
    const { dispatch } = this.props;

    dispatch({
      type: 'my/logout',
      payload: {},
    });
  }

  render() {
    const { my } = this.props;
    const { nickName, avatarUrl } = my;

    return (
      <div className={styles.content}>
        <div className={styles.info}>
            <img className={styles.avatarUrl} src={avatarUrl} alt="头像" />
          <div className={styles.nickName}>
            <div>{nickName}</div>
          </div>
        </div>
        <List className={styles.menuList}>
          <Item arrow="horizontal">历史订购</Item>
          <Item arrow="horizontal" onClick={()=>{this.handleLogout()}}>登出</Item>
        </List>
      </div>
    );
  }
}

export default My;
