import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Table, Card, Space, Badge, Button, Select, DatePicker, Input, Tag } from 'antd';
import styles from './index.less';
import { getCustomer } from '@/services/customer';
import { history,connect } from 'umi';
import CustomerMsg from '@/pages/Order/OrderList/Detail/components/CustomerMsg';

const { Option } = Select;
const { RangePicker } = DatePicker;

const columns = [
  {
    title: '姓名',
    dataIndex: 'display_name',
    valueType: 'text',
    align: 'center',
    render: (_, record) => {
      return <span>{record.first_name + record.last_name}</span>;
    },
  },
  {
    title: '地区',
    dataIndex: 'billing_address',
    valueType: 'text',
    align: 'center',
    render: (_, record) => {
      return <span>{record.billing_address.city}</span>;
    },
  },
  {
    title: '订阅状态',
    dataIndex: 'subscribed',
    valueType: 'text',
    align: 'center',
    valueEnum: {
      true: {
        text: <Tag color="blue">已订阅</Tag>,
        status: 'true',
      },
      false: {
        text: <Tag color="orange">未订阅</Tag>,
        status: 'false',
      },
    },
  },
  {
    title: '订单数',
    dataIndex: 'order_count',
    valueType: 'text',
    align: 'center',
  },
  {
    title: '订单总金额',
    dataIndex: 'order_total',
    valueType: 'money',
    align: 'center',
  },
];

const Customer = ({ dispatch, user }) => {
  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        {/*         <Space style={{ marginBottom: '35px' }}>
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
          
          &nbsp;&nbsp;&nbsp;
          <Button>重置</Button>
        </Space> */}

        <ProTable
          columns={columns}
          rowKey={(record) => record.ID}
          request={async (params, sorter, filter) => {
            const res = await getCustomer({ ...params, sorter, filter });
            console.log(res);
            return { data: res.data, success: true, total: 25 };
          }}
          toolBarRender={false}
          search={false}
          onRow={(record) => {
            return {
              onClick: () => {
                history.push('CustomerList/Detail');
                dispatch({
                  type: 'customer/getUserById',
                  payload: { id: record.ID },
                });
              },
            };
          }}
        />
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateProps = ({ customer: { user } }) => {
  return { user };
};
export default connect(mapStateProps)(Customer);

