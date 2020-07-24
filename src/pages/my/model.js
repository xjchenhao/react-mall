import { logout } from '@/services/account';
import { info as getUserInfo } from '@/services/user';
import router from 'umi/router';
import { Toast } from 'antd-mobile';

export default {
  namespace: 'my',
  state: {
    nickName:'',
    avatarUrl:''
  },
  effects: {
    *getUserInfo({ payload }, { call, put }) {
      const response = yield call(getUserInfo, payload);
      const { data } = response;

      yield put({
        type: 'save',
        payload: {
          ...data,
        },
      });
    },
    *logout({ payload }, { call, put }) {
      const response = yield call(logout, payload);
      const { code,msg } = response;

      if(code!=='0'){
        Toast.fail(msg,1);

        return;
      }

      yield put({
        type: 'save',
        payload: {
          nickName:'',
          avatarUrl:''
        },
      });

      router.push('/login')
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
