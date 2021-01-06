import React, { useEffect, useState } from 'react';
import { Table, Card, Space, Button, Select, Input, Tag, Modal, Form } from 'antd';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import GoodModal from './components/GoodMoadl';
const { Option } = Select;
const index = ({ dispatch, productData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [Record, setRecord] = useState(undefined);
  useEffect(() => {
    dispatch({
      type: 'goodList/getProducts',
    });
  }, []);
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
      dataIndex: 'post_status',
      align: 'center',
      render: (_, record) => {
        let res = record.post_status;
        let color = res === 'publish' ? 'green' : 'red';
        let status = res === 'publish' ? '上架中' : '已下架';
        return (
          <Space>
            <Tag color={color} key={record.goodstatus}>
              {status}
            </Tag>
          </Space>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              modifyGood(record);
            }}
          >
            编辑
          </a>
        </Space>
      ),
    },
  ];

  const data = productData;
  const pagination = {
    pageSize: 5,
  };
  const routes = [
    {
      breadcrumbName: '首页',
    },
    {
      breadcrumbName: '商品列表',
    },
  ];
  const addGood = () => {
    setModalTitle('新增商品');
    setIsModalVisible(true);
  };
  const modifyGood = (record) => {
    setModalTitle('编辑商品');
    setRecord(record);
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  return (
    <PageHeaderWrapper
      breadcrumb={{ routes }}
      title="商品列表"
      extra={[
        <Button key="1" type="primary" size="middle" onClick={addGood}>
          添加商品
        </Button>,
      ]}
      style={{ marginTop: '-25px' }}
    >
      <Card bordered={false}>
        <GoodModal />
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

        <Table
          columns={columns}
          dataSource={data}
          rowSelection
          pagination={pagination}
          rowKey="ID"
        />
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = ({ goodList }) => {
  return {
    productData: goodList.productsList.data,
  };
};
export default connect(mapStateToProps)(index);
