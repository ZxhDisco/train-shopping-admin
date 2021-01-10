import request from '@/utils/request';
import axios from 'axios';

export async function getCategoryList() {
  return request('/api/admin/categories');
}
export async function updateCategory({ params, id }) {
  return request(`/api/admin/categories/${id}`, {
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
export async function addCategory(params) {
  return axios
    .post(
      '/api/admin/categories',
      {
        data: params,
      },
      {
        headers: {
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiYmRlYmQyNGVjMWFkODBkZTJlMDA2NGJjNDdkNzNlYmZhY2ZmZGJiZmYxMjRlOWE0MDJmOGJkMGJiOGU5Y2VjMjVjM2E1MTYyMjA2YjE5MmYiLCJpYXQiOjE2MDkyNTQ3NDgsIm5iZiI6MTYwOTI1NDc0OCwiZXhwIjoxNjQwNzkwNzQ4LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.HwHEfvnzBZhGRFOigRW_6zKzMuylG1rGMT1xvjvXxw9J33sJtJ-NLtwQw2t7sxkc-p9TDLbovqgcMiROLZXnaJMTdJ7oZAq_sp6Wv6r6apZQ5WNnspDZ6vNYxk7hSMM1iOP48NTntTwmzRaYf5-ePGyt9_WM05IIzlqkyym6fWh49AEilpZIRTler8seaceRwC8J6SQ21g9okE5NKFPtmhehIT23fn-yyMpnKvJYi2_xv4e9zqRIO2rk8urbUgf66hAyHJfsE2LOZfVAWg-vUE2d_S-kbU-qAswgtBs5iQ5jp6dqODQ4gmhfecriFKYsIhdkR2iFakhBHQo6dHw5BM42gwepGkCStXEDXn6G2zqC6cJqBuVVLaFJ4DLnY4PaGjDf08NCy6HV8wo6HnypAQS9_Y9jHjEAIGE37LBRKD0bdQehUyqccbj25U75ZkT6iq6S3oZ0bt3AEwR-OigybN3pO4z4Kd4H-i5s_bQIL-vu3eJsub8z6fhN9uS0XsX65oB6RprTx4leTSis1qMbaJ7DXzsAk1o7oWBW2rrRCwe2TWplN2FUXqbrhI1_AtjkrxEQ1IaLWRk3fzv6pFC-Q8T7WthwX3VDvUiS2_U2CQVWMxSfxR74h2Dgy5CwASE2fWJbgbFtSMKwK5xFR1tzVtfIoOsaVfLtu6Jnhmbxsw8',
        },
      },
    )
    .then((res) => {
      message.success('添加成功');
    })
    .catch((error) => {
      message.error('添加失败');
    });
}
