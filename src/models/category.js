import { getCategoryList, updateCategory, addCategory } from '@/services/category';

const Category = {
  namespace: 'category',
  state: {
    categoryList: {},
    Record: null,
  },
  effects: {
    *getCategoryList(_, { call, put }) {
      const res = yield call(getCategoryList);
      console.log(res);
      yield put({
        type: 'saveCategoryList',
        payload: {
          data: res,
        },
      });
    },
    *updateCategory({ payload: { values, id } }, { call, put }) {
      yield call(updateCategory, { values, id });
      yield put({
        type: 'getCategoryList',
      });
    },
    *addCategory({ payload: { values } }, { call, put }) {
      yield call(addCategory, values);
      yield put({
        type: 'getCategoryList',
      });
    },
  },
  reducers: {
    saveCategoryList(state, { payload: { data } }) {
      return {
        ...state,
        categoryList: data,
      };
    },
    changeRecord(state, { payload: { values } }) {
      return {
        ...state,
        Record: values,
      };
    },
  },
};
export default Category;
