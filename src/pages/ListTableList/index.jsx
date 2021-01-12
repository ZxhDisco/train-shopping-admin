import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl, FormattedMessage, history, connect } from 'umi';
import { message, Space, Badge, Button, Input, Table, Tag } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm, {
  ProFormSelect,
  ProFormDateRangePicker,
  ProFormText,
  ProFormFieldSet,
} from '@ant-design/pro-form';
import { query  } from '@/services/order';
// import styles from './index.css';

const columns = [
  {
    title: '订单编号',
    dataIndex: 'number',
    tip: '订单编号 ',
    render: (dom, entity) => {
      return (
        <a
          onClick={() => {
            setCurrentRow(entity);
          }}
        >
          {dom}
        </a>
      );
    },
  },
  {
    title: "付款时间",
    dataIndex: 'paid_date',
  },
  {
    title: "订单状态" ,
    dataIndex: 'post_status',
    hideInForm: true,
    valueEnum: {
      'wc-cancelled': {
        text: <Badge status="error" text="已取消" />,
        status: 'wc-cancelled',
      },
      'wc-processing': {
        text: <Badge status="processing" text="运行中" />,
        status: 'wc-processing',
      },
      'wc-completed': {
        text: <Badge status="success" text="已完成" />,
        status: 'wc-completed',
      },
      'wc-pending': {
        text: <Badge status="default" text="待处理" />,
        status: 'wc-pending',
      },
    },
  },
  {
    title: '发货状态',
    dataIndex: 'fulfillment_status',
    hideInForm: true,
    valueEnum: {
      fulfilled: {
        text: <Tag color="default">已发货</Tag>,
        status: 'fulfilled',
      },
      unfulfilled: {
        text: <Tag color="error">未发货</Tag>,
        status: 'unfulfilled',
      },
    },
  },
  {
    title: '订单金额',
    dataIndex: 'order_total',
    // hideInForm: true,
    renderText: (val, item) => `${item.order_currency}${val}`,
  },
  {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    render: (_, record) => [
      <a
        key="config"
        onClick={() => {
          setCurrentRow(record);
          dispatch({
            type: 'order/getOrderById',
            payload: {
              id: record.ID,
            },
          });
          history.push('OrderList/Detail');
        }}
      >
        查看
      </a>,
    ],
  },
];


const index = () => {
  useEffect(async () => {
    const res = await query(filter);
    setData(res.data);
  }, [filter]);
  
  const [filter, setFilter] = useState({});
  const [data, setData] = useState({});
  return (
    <PageHeaderWrapper>
{/*       <ProForm
        onFinish={async (values) => {
          setFilter(values);
          const res = await queryOrder(filter);
          console.log(res), 'onFinish';
        }}
      >
        <ProForm.Group>
          <ProFormSelect
            name="filter[status]"
            width="small"
            valueEnum={{
              'wc-cancelled': {
                text: <Badge status="error" text="已取消" />,
                status: 'wc-cancelled',
              },
              'wc-processing': {
                text: <Badge status="processing" text="运行中" />,
                status: 'wc-processing',
              },
              'wc-completed': {
                text: <Badge status="success" text="已完成" />,
                status: 'wc-completed',
              },
              'wc-pending': {
                text: <Badge status="default" text="待处理" />,
                status: 'wc-pending',
              },
            }}
            placeholder="全部订单状态"
          />
          <ProFormSelect
            name="filter[fulfillment_status]"
            placeholder="全部发货状态"
            width="small"
            valueEnum={{
              fulfilled: {
                text: <Tag color="default">已发货</Tag>,
                status: 'fulfilled',
              },
              unfulfilled: {
                text: <Tag color="error">未发货</Tag>,
                status: 'unfulfilled',
              },
            }}
          />
          <ProFormDateRangePicker name="filter[date]" />
          <ProFormText
            name="filter[search]"
            placeholder="请输入订单编号/支付编号/商品名/SKU/邮箱"
          />
          &nbsp;&nbsp;
        </ProForm.Group>
      </ProForm>
 */}
      <ProTable columns={columns} toolBarRender={false} dataSource={''} />
    </PageHeaderWrapper>
  );
};

export default index;
