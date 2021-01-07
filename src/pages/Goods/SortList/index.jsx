import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Card, Space, Button, Select, Input } from 'antd';
import { Link } from 'umi';
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
      render: (_, record) => (
        <Space size="middle">
          <Link to={'./ModifySort/' + record.ID}>编辑</Link>
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
  const routes = [
    {
      breadcrumbName: '首页',
    },
    {
      breadcrumbName: '分类列表',
    },
  ];
  return (
    <PageHeaderWrapper
      breadcrumb={{ routes }}
      title="分类列表"
      extra={[
        <Link to="./AddSort" key="link">
          <Button type="primary" size="large">
            新增分类
          </Button>
        </Link>,
      ]}
      style={{ marginTop: '-25px' }}
    >
      <Card bordered={false}>
        <Space style={{ marginBottom: '35px' }}>
          <Input placeholder="请输入分类名称" style={{ width: '20rem' }} />
          &nbsp;
          <Button type="primary">查询</Button>
          <Button>重置</Button>
        </Space>

        <Table columns={columns} dataSource={data} rowSelection pagination={pagination} />
      </Card>
    </PageHeaderWrapper>
  );
};

export default index;
