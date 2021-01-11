import request from '@/utils/request';

export async function getCustomer(params){
    return request('/api/admin/customers')
}

export async function getCustomerById(params){
    return request(`/api/admin/customers/${params}`)
}
