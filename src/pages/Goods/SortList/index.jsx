import React from 'react';
import { Table, Card, Space, Button, Select, Input, PageHeader } from 'antd';
import {Link} from 'umi'
const { Option } = Select;

const index = () => {
  const columns = [
    {
      title: '分类',
      dataIndex: 'goodcategory',
      align: 'left',
    },
    {
      title: '商品数量',
      dataIndex: 'sku',
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <Space size="middle">
          <a>编辑</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      goodcategory: '衣服',
      sku: 99,
    },
    {
      key: '2',
      goodcategory: '裤子',
      sku: 12,
    },
    {
      key: '3',
      goodcategory: '鞋子',
      sku: 3,
    },
  ];
  const pagination = {
    pageSize: 5,
  };
  return (
    <PageHeader
      title="分类列表"
      extra={[
        <Button key="1" type="primary" size="large">
          新增分类
        </Button>,
      ]}
      style={{ marginTop: '-25px' }}
    >
      <Card bordered={false}>
        <Space style={{ marginBottom: '35px' }}>
          <Input placeholder="请输入分类名称" style={{ width: '20rem' }} />
          &nbsp;
          <Button type="primary"><Link to='/Goods/SortList/demo'>查询</Link></Button>
          <Button>重置</Button>
        </Space>

        <Table columns={columns} dataSource={data} rowSelection pagination={pagination} />
      </Card>
    </PageHeader>
  );
};

export default index;
