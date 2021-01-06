import request from '@/utils/request';

export async function getGoodList() {
  return request('/api/admin/products');
}
