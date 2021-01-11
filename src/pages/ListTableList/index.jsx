import { PageHeaderWrapper } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import React from 'react'
// import React, { useState, useRef } from 'react';
// import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { useIntl, FormattedMessage, Link, connect } from 'umi';
import { message, Space, Badge, Button,  Input, Table, Tag } from 'antd';
// import ProTable from '@ant-design/pro-table';
// import ProForm, { ProFormSelect, ProFormDateRangePicker, ProFormText } from '@ant-design/pro-form';
// import { query as queryOrder } from '@/services/order';
// import styles from './index.css';
import { getCustomer } from '@/services/customer'


const columns = [
  {
    title:'姓名',
    dataIndex: 'display_name',
    valueType: 'text',
    align:'center',
    render: (_, record) =>{
      return (
        <span>{record.first_name + record.last_name}</span>
      )
    }
  },
  {
    title:'地区',
    dataIndex: 'billing_address',
    valueType: 'text',
    align:'center',
    render: (_, record) => {
      return (
        <span>{record.billing_address.city}</span>
      )
    }
  }, 
  {
    title:'订阅状态',
    dataIndex: 'subscribed',
    valueType: 'text',
    align:'center',
    valueEnum: {
      true: {
        text: <Tag color="blue">已订阅</Tag>,
        status: 'true',
      },
      false: {
        text: <Tag color="orange">未订阅</Tag>,
        status: 'false',
      }
    }

  },
  {
    title:'订单数',
    dataIndex: 'order_count',
    valueType: 'text',
    align:'center'

  },
  {
    title:'订单总金额',
    dataIndex: 'order_total',
    valueType: 'money',
    align:'center'
  },
  
]
const index = () => {
  return (
    <PageHeaderWrapper>
      <ProTable 
        columns={columns}
        request={
          async(params, sorter, filter) => {
            const res = await getCustomer({...params, sorter, filter})
            console.log(res,'query');
            return { data: res.data, success: true, total:25 }
          }
        }
        toolBarRender={false}
      />
    </PageHeaderWrapper>
  )
}

export default index
