import { getDetail } from '@/services/product';
import { create as createOrder } from '@/services/order';
import router from 'umi/router';
import { Toast } from 'antd-mobile';

export default {
  namespace: 'productDetail',
  state: {
    detail:{},
  },
  effects: {
    *getDetail({ payload }, { call, put }){
      const response = yield call(getDetail, payload);
      const { data } = response;

      yield put({
        type: 'save',
        payload: {
          detail:{
            ...data,
          },
        },
      });
    },
    *buy({ payload }, { call, put }){
      const response = yield call(createOrder, payload);
      const { data } = response;

      yield put({
        type: 'save',
        payload: {
          detail:{
            ...data,
          },
        },
      });

      Toast.success('支付成功，即将返回首页',3,()=>{
        router.push('/');
      });
    }
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
