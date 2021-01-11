import { query as queryOrders, queryById, updateStatus } from '@/services/order';
import {getCustomer} from '@/services/customer'

const OrderModel = {
  namespace: 'order',
  state: {
    data: [],
    user: {},
    meta: {},
    id:''
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryOrders);
      console.log(response, 'response');
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *getOrderById({ payload: { id } }, { call, put }) { 
      const result = yield call(getCustomer)
      console.log(result,'result');
      const res = yield call(queryById, id);    
      yield put({ type: 'detail', payload: res });
    },
    *updateOrderStatus({payload:{params, params2}},{ call, put}){
      console.log(params, params2);
      const res = yield call(updateStatus,{params,params2})
      
    }
  },
  reducers: {
    save(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    detail(state, {payload}){
      console.log(payload,'payload');
      return {...state, user:payload}
    },
  },
}
export default OrderModel;
