import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Card, Space, Badge, Button, Select, DatePicker, Input } from 'antd';
import styles from './index.less'

const { Option } = Select;
const { RangePicker } = DatePicker;
const data = [
    {
      key: '1',
      cname: '佘智伟',
      area: '莆田',
      subscription: '未订阅',
      ordernum: 3,
      price: 99,
    },
    {
      key: '2',
      cname: '聂守钬',
      area: '闽侯',
      subscription: '已订阅',
      ordernum: 33,
      price: 499.9,
    },
    {
      key: '3',
      cname: '郑俊杰',
      area: '连江',
      subscription: '已订阅',
      ordernum: 6,
      price: 199.9,
    },
  ];

const index = () => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'cname',
      align: 'center',
    },
    {
      title: '地区',
      dataIndex: 'area',
      align: 'center',
    },
    {
      title: '订阅状态',
      dataIndex: 'subscription',
      align: 'center',
      render: (text, record) => {
        let res = record.subscription;
        let color = res === '已订阅' ? 'success' : 'error';
        return <Badge status={color} text={record.subscription} />;
      },
    },
    {
      title: '订单数',
      dataIndex: 'ordernum',
      align: 'center',
    },
    {
      title: '订单总金额',
      dataIndex: 'price',
      valueType: 'money',
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
          
        <Table columns={columns} dataSource={data}  pagination={pagination} />
      </Card>
    </PageHeaderWrapper>
  );
};

export default index;
