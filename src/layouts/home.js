import React, { useState} from 'react';
import styles from './index.css';
import { TabBar } from 'antd-mobile';
import { HomeFilled,HomeOutlined } from '@ant-design/icons';
import router from 'umi/router';

function BasicLayout(props) {

  const [selectedTab,setSelectedTab]=useState('home');

  return (
    <div className={styles.normal}>
      {props.children}
      <TabBar
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
              setSelectedTab('home')
              router.push('/');
            }}
          >
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="我的"
            key="my"
            selected={selectedTab === 'my'}
            onPress={() => {
              setSelectedTab('my')
              router.push('/');
            }}
          >
          </TabBar.Item>
        </TabBar>
    </div>
  );
}

export default BasicLayout;
