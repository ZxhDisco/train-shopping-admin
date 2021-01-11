import React, { useEffect } from 'react';
import { Table, Card, Space, Button, Select, Input, Tag } from 'antd';
import { connect, Link } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi';
const { Option } = Select;

const index = ({ dispatch, productData }) => {
  useEffect(() => {
    dispatch({
      type: 'goodList/getProducts',
    });
  }, []);
  //传递id
  const getGood = (values) => {
    dispatch({
      type: 'goodList/getGood',
      payload: values,
    });
    setTimeout(() => {
      history.push('./ModifyGood/' + values);
    }, 1000);
  };
  const columns = [
    {
      title: '商品',
      dataIndex: 'title',
      align: 'left',
    },
    {
      title: '分类',
      dataIndex: 'categories[0].name',
      align: 'center',
      render: (_, r) => r.categories[0]?.name,
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
              getGood(record.ID);
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
  return (
    <PageHeaderWrapper
      breadcrumb={{ routes }}
      title="商品列表"
      extra={[
        <Link to="./AddGood" key="link">
          <Button type="primary" size="large">
            添加商品
          </Button>
        </Link>,
      ]}
      style={{ marginTop: '-25px' }}
    >
      <Card bordered={false}>
        <Space style={{ marginBottom: '35px' }}>
          <Select defaultValue="全部分类">
            <Option value="all"> 全部分类 </Option>
            <Option value="衣服">衣服 </Option>
            <Option value="裤子">裤子 </Option>
            <Option value="鞋子">鞋子 </Option>
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
