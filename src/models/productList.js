import { getList } from '@/services/product';

export default {
  namespace: 'productList',
  state: {
    list: [],
    pageSize: 20,
    currentPage: 1,
    total: 0,
    totalPage: 0,
  },
  effects: {
    *getList({ payload }, { call, put,select }) {
      const response = yield call(getList, payload);
      const list = yield select(state => state.productList.list);
      const { data } = response;

      yield put({
        type: 'save',
        payload: {
          ...data,
          list:list.concat(data.list),
        },
      });
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
