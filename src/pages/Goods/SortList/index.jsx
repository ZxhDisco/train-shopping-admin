import React, { useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Card, Space, Button, Select, Input } from 'antd';
import { Link, connect } from 'umi';
const { Option } = Select;

const index = ({ categoryList, dispatch }) => {
  useEffect(() => {
    dispatch({
      type: 'category/getCategoryList',
    });
  }, []);
  //保存record传到修改页面
  const changeRecord = (values) => {
    dispatch({
      type: 'category/changeRecord',
      payload: {
        values,
      },
    });
  };
  const columns = [
    {
      title: '分类',
      dataIndex: 'name',
      align: 'left',
    },
    {
      title: '商品数量',
      dataIndex: 'count',
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Link
            to={'./ModifySort/' + record.id}
            onClick={() => {
              changeRecord(record);
            }}
          >
            编辑
          </Link>
        </Space>
      ),
    },
  ];

  const data = categoryList;
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
          <Button type="primary"><Link to='/Goods/SortList/demo'>查询</Link></Button>
          <Button>重置</Button>
        </Space>

        <Table
          columns={columns}
          dataSource={data}
          rowSelection
          pagination={pagination}
          rowKey="id"
        />
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = ({ category }) => {
  return {
    categoryList: category.categoryList.data,
  };
};
export default connect(mapStateToProps)(index);
