import React, { useState,useEffect} from 'react';
import { List, InputItem, Button } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { createForm } from 'rc-form';

import { connect } from "dva";

import styles from './index.css';

const Login = props => {
  const { getFieldProps, validateFields } = props.form;

  const [btnActiveState, setBtnActiveState] = useState(false);

  useEffect(()=>{
    const userNameValue=getFieldProps('userName').value;
    const passwordValue=getFieldProps('password').value;

    if(userNameValue&&passwordValue){
      setBtnActiveState(true)
    }else{
      setBtnActiveState(false)
    }
  })

  const handleLoginSubmit = () => {
    const { dispatch } = props;

    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'login/login',
          payload: {
            ...values
          },
        });
      } else {
        let errTip = [];
        for (let [key, value] of Object.entries(err)) {
          const { errors } = value || {};
          if (errors) {
            const { message } = (errors && errors[0]) || {};
            errTip.push(message);
          }
        }
        console.log(errTip);
      }
    });
  };

  const SubmitBtn = () => {
    if (!btnActiveState) {
      return (
        <Button type="primary" className={styles.submitBtn} disabled>
          立即登录
        </Button>
      );
    } else {
      return (
        <Button type="primary" className={styles.submitBtn} onClick={handleLoginSubmit}>
          立即登录
        </Button>
      );
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.logo}>GDB Mall</div>
      <List>
        <InputItem
          {...getFieldProps('userName')}
          clear
          key="userName"
          placeholder="test"
          // ref={el => this.autoFocusInst = el}
        >
          账号
        </InputItem>
        <InputItem
          {...getFieldProps('password')}
          clear
          key="password"
          type="password"
          placeholder="testpwd"
          // ref={el => this.inputRef = el}
        >
          密码
        </InputItem>
      </List>
      <div className={styles.operation}>
        <SubmitBtn />
        <p className={styles.submitTips}>
          登录/注册即表示同意
          <Link className={styles.submitTipsLink} to="/login">
            《用户注册协议》
          </Link>
        </p>
      </div>
    </div>
  );
};

export default createForm()(connect(({ login }) => ({
  login,
}))(Login));
