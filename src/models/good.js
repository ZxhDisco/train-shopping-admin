import { getGoodList, getGood, updateGood, addGood, searchGood, deleteGood } from '@/services/good';

const GlobalModel = {
  namespace: 'goodList',
  state: {
    productsList: {},
    recordShow: {},
    usefulRecord: { tags: [], categories: [] },
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
    *getGood({ payload: { id } }, { call, put }) {
      const res = yield call(getGood, id);
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
    *searchGood({ payload }, { call, put }) {
      const res = yield call(searchGood, payload);
      console.log(res, '123');
      yield put({
        type: 'saveSearchGood',
        payload: res,
      });
    },
    *deleteGood({ payload }, { call, put }) {
      yield call(deleteGood, payload);
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
      useRecord.manage_stock = payload.manage_stock;
      useRecord.post_content = payload.post_content;
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
    saveSearchGood(state, { payload }) {
      return {
        ...state,
        productsList: payload,
      };
    },
  },
};
export default GlobalModel;
