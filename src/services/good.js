import request from '@/utils/request';
import { message } from 'antd';

export async function getGoodList() {
  return request('/api/admin/products');
}
export async function getGood(params) {
  return request(`/api/admin/products/${params}`);
}

export async function updateGood({ params, id }) {
  return request(`/api/admin/products/${id}`, {
    method: 'PUT',
    data: params,
  })
    .then((res) => {
      message.success('修改成功');
    })
    .catch((error) => {
      message.error('修改失败');
    });
}

export async function addGood(params) {
  return request('/api/admin/products', {
    method: 'POST',
    data: params,
  })
    .then((res) => {
      message.success('添加成功');
    })
    .catch((error) => {
      message.error('添加失败');
    });
}
