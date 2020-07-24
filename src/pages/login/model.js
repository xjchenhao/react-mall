import { login } from '@/services/account';
import { Toast } from 'antd-mobile';

export default {
  namespace: 'login',
  state: {
  },
  effects: {
    *login({ payload }, { call, put }) {

      const response = yield call(login, payload);
      const { code, data, msg } = response;

      if (code !== 0) {
        Toast.fail(msg);
      } else {
        yield put({
          type: 'save',
          payload: {
            data
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
