import { getDetail } from '@/services/product';

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
