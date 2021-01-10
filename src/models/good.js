import { getGoodList, getGood, updateGood, addGood } from '@/services/good';

const GlobalModel = {
  namespace: 'goodList',
  state: {
    productsList: {},
    recordShow: {},
    usefulRecord: {},
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
    *getGood({ payload }, { call, put }) {
      const res = yield call(getGood, payload);
      yield put({
        type: 'saveGood',
        payload: res,
      });
    },
    *updateGood({ payload: { params, id } }, { call, put }) {
      yield call(updateGood, { params, id });
      yield put({
        type: 'getProducts',
      });
    },
    *addGood({ payload: { values } }, { call, put }) {
      yield call(addGood, values);
      yield put({
        type: 'getProducts',
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
    saveGood(state, { payload }) {
      let useRecord = {};
      useRecord.title = payload.title;
      useRecord.price = payload.price;
      useRecord.regular_price = payload.regular_price;
      useRecord.sku = payload.sku;
      useRecord.post_status = payload.post_status;
      return {
        ...state,
        recordShow: useRecord,
        usefulRecord: payload,
      };
    },
    selectGood(state, _) {
      let newProductsList = JSON.parse(JSON.stringify(state.productsList));
      const res = newProductsList.filter((item) => {
        return item.title.includes('p');
      });
      return {
        ...state,
        productsList: res,
      };
    },
  },
};
export default GlobalModel;
