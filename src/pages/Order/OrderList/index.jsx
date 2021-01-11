import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl, FormattedMessage, Link, connect } from 'umi';
import { message, Space, Badge, Button,  Input, Table, Tag } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm, { ProFormSelect, ProFormDateRangePicker, ProFormText } from '@ant-design/pro-form';
import { query as queryOrder } from '@/services/order';
import styles from './index.css';


/**
 * 添加节点
 * @param fields
 */
/**
 * 更新节点
 * @param fields
 */
/**
 *  删除节点
 * @param selectedRows
 */

const TableList = ({ order, dispatch }) => {
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const [isShowDetail, setIsShowDetail] = useState(false);

  const intl = useIntl();
  const columns = [
    {
      title: <FormattedMessage id="pages.searchTable.orderNum" defaultMessage="订单编号" />,
      dataIndex: 'number',
      tip: '订单编号 ',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.paidTime" defaultMessage="付款时间" />,
      dataIndex: 'paid_date',
    },
    {
      title: <FormattedMessage id="pages.searchTable.orderStatus" defaultMessage="订单状态" />,
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
      title: <FormattedMessage id="pages.searchTable.fulfillment" defaultMessage="发货状态" />,
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
      title: <FormattedMessage id="pages.searchTable.orderAmount" defaultMessage="订单金额" />,
      dataIndex: 'order_total',
      sorter: true,
      hideInForm: true,
      renderText: (val, item) => `${item.order_currency}${val}`,
    },
    {
      title: <FormattedMessage id="pages.searchTable.orderOption" defaultMessage="操作" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Link
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
            dispatch({
              type: 'order/getOrderById',
              payload: {
                id: record.ID,
              },
            });
          }}
          to="/Order/OrderList/Detail"
        >
          <FormattedMessage id="pages.searchTable.config" defaultMessage="查看" />
        </Link>,
      ],
    },
  ];

  return (
    <PageHeaderWrapper>
      <div className={styles.searchContent}>
      <ProForm >
        <ProForm.Group>
          <ProFormSelect
            width='small'
            options={[
              {
                value: 'processing',
                label: <Badge status="processing" text="运行中" />,
              },
              {
                value: 'completed',
                label: <Badge status="success" text="已完成" />,
              },
              {
                value: 'cancelled',
                label: <Badge status="error" text="已取消" />,
              },
            ]}
            placeholder="全部订单状态"
          />
          <ProFormSelect
            placeholder="全部发货状态"
            width='small'
            options={[
              {
                value: 'shipping',
                label: <Tag color="default">已发货</Tag>,
              },
              {
                value: 'un_shipping',
                label: <Tag color="error">未发货</Tag>,
              },
            ]}
          />
          <ProFormDateRangePicker name="dateRange" />
          <ProFormText
            placeholder="请输入订单编号/支付编号/商品名/SKU/邮箱"
            
          />
          &nbsp;&nbsp;
        </ProForm.Group>
      </ProForm>
      </div>
      <Space style={{ display: `${isShowDetail ? 'flex' : 'none'}` , marginTop:10}} >     
        <Input.Group compact>
          <Input style={{ width: 100, textAlign: 'center' }} placeholder="最小金额" />
          <Input
            style={{
              width: 30,
              borderLeft: 0,
              borderRight: 0,
              pointerEvents: 'none',
            }}
            placeholder="~"
            disabled
          />
          <Input
            style={{
              width: 100,
              textAlign: 'center',
            }}
            placeholder="最大金额"
          />
        </Input.Group>
        &nbsp;&nbsp;
        <Input.Group compact>
          <Input style={{ width: 200, textAlign: 'center' }} placeholder="最小订单" />
          <Input
            style={{
              width: 30,
              borderLeft: 0,
              borderRight: 0,
              pointerEvents: 'none',
            }}
            placeholder="~"
            disabled
          />
          <Input
            style={{
              width: 200,
              textAlign: 'center',
            }}
            placeholder="最大订单"
          />
        </Input.Group>
      </Space> 
      <Button type="link" block onClick={() => setIsShowDetail(!isShowDetail)}>
        {isShowDetail ? '收起更多' : '筛选更多'}&nbsp;
        <span className={isShowDetail ? styles.arrowBottom : styles.arrowTop}></span>
      </Button>
      <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: '查询表格',
        })}
        actionRef={actionRef}
        rowKey={(record) => record.ID}
        search={false}
        toolBarRender={false}
        request={async (params, sorter, filter) => {
          const res = await queryOrder({ ...params, sorter, filter });
          // console.log(res,'res');
          return { data: res.data, success: true, total: 25 };
        }}
        columns={columns}
        rowSelection={{
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        tableAlertRender={({ selectedRowKeys,selectedRows }) => (
          <Space size={24}>
            <span>已选 {selectedRowKeys.length} 项</span>
            <Space size={16}>
              <a onClick={()=>console.log(selectedRowKeys,'1')}>发货</a>
              <a 
                onClick={()=>{
                  let count = 0
                  selectedRows.map(item=>{
                  if(item.post_status === 'wc-cancelled' || item.post_status === 'wc-completed'){
                    count += 1
                  }})
                  if (count > 0) {
                    message.error('只能修改运行中的订单，请重新选择')
                  }else{
                    dispatch({
                      type:"order/updateOrderStatus",
                      payload:{ nums: selectedRowKeys }
                    })
                  }
              }}
              >标记已完成</a>
              <a >标记进行中</a>
            </Space>
          </Space>
        )}
      />
    </PageHeaderWrapper>
  );
};


const mapStateProps = ({ order }) => {
  return {
    order,
  };
};
export default connect(mapStateProps)(TableList);
