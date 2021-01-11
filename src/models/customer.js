import {getCustomerById} from '@/services/customer'

const CustmerModel = {
  namespace: 'customer',
  state: {
    user: {},
    ID:''
  },
  effects: {
    *getUserById({ payload: { id } }, { call, put }) { 
      const result = yield call(getCustomerById,id)
      yield put({ type: 'detail', payload: {result:result,uid:id} });
    },
   
  },
  reducers: {
    detail(state, {payload}){
      const {result, uid} = payload
     
      return {...state, user:result,ID:uid  }
    },
  },
}
export default CustmerModel;
