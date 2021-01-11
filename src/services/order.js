import request from '@/utils/request';

export async function query(params){
    return request('/api/admin/orders')
}

export async function queryById(params){
    return request(`/api/admin/orders/${params}`)
}

export async function updateStatus({params,params2}){
    return request(`/api/admin/orders/${params}/track`,
    {
        method:'POST',
        data:params2     
    })
}
async function test(){
    return request(`/api/admin/orders/?filter[status]=wc-completed`,
    {
        method:'GET',
    }).then(res=>console.log(res,'test'))
}
test()