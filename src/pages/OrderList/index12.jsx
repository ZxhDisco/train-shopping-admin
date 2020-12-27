import React, { useRef } from 'react';
import {  Badge, Space, Menu, Dropdown } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';

const columns = [
    {
      title: '订单编号',
      dataIndex: 'oid',
      align: 'center',
    },
    {
      title: '付款时间',
      dataIndex: 'ptime',
      align: 'center',
      valueType: 'dateRange'
    },
    {
      title: '订单状态',
      dataIndex: 'orderstatus',
      align: 'center',
      render: (text, record) => {
        let res = record.orderstatus;
        let color = res === '进行中' ? 'processing' : res === '已完成' ? 'success' : 'error';
        return <Badge status={color} text={record.orderstatus} />;
      },
    },
    {
      title: '发货状态',
      dataIndex: 'shipstatus',
      align: 'center',
    },
    {
      title: '订单金额',
      dataIndex: 'price',
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <Space size="middle">
          <a>查看</a>
          {console.log(record)}
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      oid: '1',
      ptime: 2020,
      orderstatus: '进行中',
      shipstatus: '已发货',
      price: '99.9',
    },
    {
      key: '2',
      oid: '2',
      ptime: 2021,
      orderstatus: '已完成',
      shipstatus: '未发货',
      price: '49.9',
    },
    {
      key: '3',
      oid: '3',
      ptime: 2022,
      orderstatus: '已取消',
      shipstatus: '已发货',
      price: '99.9',
    },
  ];

export default () => {
    const actionRef = useRef();
    return (
        <ProTable 
            columns={columns}
            dataSource={data}
            options={false}
        /> 
    )
    
};