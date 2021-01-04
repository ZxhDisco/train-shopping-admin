import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { Table, Card, Space, Badge, Button, Select, DatePicker, Input , PageHeader,Tag } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;

const index = () => {
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
    },
    {
      title: '订单状态',
      dataIndex: 'orderstatus',
      align: 'center',

      render: (_, record) => {
        let res = record.goodstatus;
        let color = res === '上架中'  ? 'green' : 'red';
        return (
          <Space>
        <Tag color={color} key={record.goodstatus}>
            {record.goodstatus}
          </Tag>
      </Space>
        )

      },
    },
    {
      title: '发货状态',
      dataIndex: 'shipstatus',
      align: 'center',
    },
    {
      title: '订单金额',
      d
      ataIndex: 'price',
      align: 'center',
    },

      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record) => (
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
  const pagination = {
    pageSize: 5,
    
  };

  const [isShowDetail, setIsShowDetail] = useState(false);
  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <Space style={{ marginBottom: '35px' }}>
          <Select defaultValue=" 全部订单状态  ">
            <Option value="all"> 全部订单状态 </Option>
            <Option value="进行中">进行中 </Option>
            <Option value="已完成">已完成 </Option>
            <Option value="已取消">已取消 </Option>
          </Select>
          &nbsp;&nbsp;&nbsp;
          <Select defaultValue=" 全部发货状态  ">
            <Option value="all"> 全部发货状态 </Option>
            <Option value="已发货">已发货</Option>
            <Option value="已取消">已取消</Option>
          </Select>
          &nbsp;&nbsp;&nbsp;
          <RangePicker />
          &nbsp;&nbsp;&nbsp;
          <Input placeholder="请输入订单编号/支付编号/商品名/SKU/邮箱" style={{ width: '20rem' }} />



          &nbsp;&nbsp;&nbsp;
          <Button type="primary">查询</Button>
          &nbsp;&nbsp;&nbsp;
          <Button>重置</Button>

        </Space>

        <Space style={{ display: `${isShowDetail ? 'flex' : 'none'}` }}>
          <Input placeholder="最小金额" /> ——
          <Input placeholder="最大金额" />
          <Input placeholder="最小订单" />
          ——
          <Input placeholder="最大订单" />
        </Space>    
         
        <Table columns={columns} dataSource={data} rowSelection pagination={pagination} />
      </Card>
    </PageHeaderWrapper>
     
  );
};

export default index;
