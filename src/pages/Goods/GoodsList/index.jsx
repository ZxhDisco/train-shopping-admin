import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Card, Space, Badge, Button, Select, DatePicker, Input , PageHeader,Tag } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;

const index = () => {
  const columns = [
    {
      title: '商品',
      dataIndex: 'title',
      align: 'left',
    },
    {
      title: '分类',
      dataIndex: 'goodcategory',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'goodstatus',
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
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <a>编辑</a>
          {console.log(record)}
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      title: '2020秋季新款上衣',
      goodcategory: '衣服',
      goodstatus: '已下架',
    },
    {
      key: '2',
      title: '2020秋季新款套装',
      goodcategory: '衣服',
      goodstatus: '上架中',
    },
    {
      key: '1',
      title: '2020秋季新款鞋子',
      goodcategory: '鞋子',
      goodstatus: '上架中',
    },
  ];
  const pagination = {
    pageSize: 5,
    
  };
  console.log('111')
  return (
    <PageHeader title="商品列表" extra={[
        <Button key="1" type="primary" size="large">
          添加商品
        </Button>,
      ]} style={{marginTop:'-25px'}}>
        <Card bordered={false}>
        <Space style={{ marginBottom: '35px' }}>
          <Select defaultValue="全部分类">
            <Option value="all"> 全部分类 </Option>
            <Option value="衣服">衣服 </Option>
            <Option value="裤子">裤子 </Option>
            <Option value="鞋子">鞋子 </Option>
          </Select>
          &nbsp;&nbsp;&nbsp;
          <Select defaultValue=" 全部标签  ">
            <Option value="all"> 全部标签 </Option>
            <Option value="标签1">标签1</Option>
            <Option value="标签2">标签2</Option>
            <Option value="标签3">标签3</Option>
          </Select>
          &nbsp;&nbsp;&nbsp;
          <Select defaultValue=" 全部状态  ">
            <Option value="all"> 全部状态 </Option>
            <Option value="已上架">已上架</Option>
            <Option value="已下架">已下架</Option>
          </Select>
          &nbsp;&nbsp;&nbsp;
          <Input placeholder="请输出商品名或SKU" style={{ width: '20rem' }} />
          &nbsp;&nbsp;&nbsp;
          <Button type="primary">查询</Button>
          &nbsp;&nbsp;&nbsp;
          <Button>重置</Button>
        </Space> 
         
        <Table columns={columns} dataSource={data} rowSelection pagination={pagination} />
      </Card>
    </PageHeader>
  );
};

export default index;