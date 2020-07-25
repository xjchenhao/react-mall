import { getList,getDetail } from '@/services/product';

export default {
  namespace: 'product',
  state: {
    detail:{},
    list: [],
    pageSize: 20,
    currentPage: 1,
    total: 0,
    totalPage: 0,
  },
  effects: {
    *getList({ payload }, { call, put,select }) {
      const response = yield call(getList, payload);
      const list = yield select(state => state.product.list);
      const { data } = response;

      yield put({
        type: 'save',
        payload: {
          ...data,
          list:list.concat(data.list),
        },
      });
    },
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
