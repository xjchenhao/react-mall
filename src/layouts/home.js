import React, { useState, useEffect } from 'react';
import styles from './index.css';
import { TabBar } from 'antd-mobile';
import { HomeFilled, HomeOutlined, SmileOutlined, SmileFilled } from '@ant-design/icons';
import router from 'umi/router';

function BasicLayout(props) {
  const [selectedTab, setSelectedTab] = useState('home');
  const selectedTabMap = {
    '/my': 'my',
    '/': 'home',
  };

  useEffect(() => {
    setSelectedTab(selectedTabMap[props.location.pathname]);
  }, [props.location, selectedTabMap]);

  return (
    <div className={styles.normal}>
      <TabBar
        prerenderingSiblingsNumber={0}
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        <TabBar.Item
          title="主页"
          key="home"
          icon={<HomeOutlined />}
          selectedIcon={<HomeFilled />}
          selected={selectedTab === 'home'}
          onPress={() => {
            router.push('/');
          }}
        >
          {props.children}
        </TabBar.Item>
        <TabBar.Item
          icon={<SmileOutlined />}
          selectedIcon={<SmileFilled />}
          title="我的"
          key="my"
          selected={selectedTab === 'my'}
          onPress={() => {
            router.push('/my');
          }}
        >
          {props.children}
        </TabBar.Item>
      </TabBar>
    </div>
  );
}

export default BasicLayout;
