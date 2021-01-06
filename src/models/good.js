import { getGoodList } from '@/services/good';

const GlobalModel = {
  namespace: 'goodList',
  state: {
    productsList: {},
  },
  effects: {
    *getProducts(_, { call, put }) {
      const response = yield call(getGoodList);
      yield put({
        type: 'saveProducts',
        payload: {
          response,
        },
      });
    },
  },
  reducers: {
    saveProducts(state, { payload: { response } }) {
      return {
        ...state,
        productsList: response,
      };
    },
  },
};
export default GlobalModel;
