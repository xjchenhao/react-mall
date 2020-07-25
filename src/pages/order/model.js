import { getList } from '@/services/order';

export default {
  namespace: 'order',
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
      const { data } = response;

      yield put({
        type: 'save',
        payload: {
          ...data,
          list:data.list,
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
