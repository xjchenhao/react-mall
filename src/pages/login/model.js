import { login } from '@/services/account';
import router from 'umi/router';
import { Toast } from 'antd-mobile';

export default {
  namespace: 'login',
  state: {},
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      const { code, data, msg } = response;

      if (code !== '0') {
        Toast.fail(msg,1);
      } else {

        Toast.info('登录成功',.5,()=>{
          router.push('/');
        });
        yield put({
          type: 'save',
          payload: {
            data,
          },
        });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
