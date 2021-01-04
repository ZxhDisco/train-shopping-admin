import { Button, message, Drawer, Badge } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
// import { queryRule, updateRule, addRule, removeRule } from './service';
import { query as queryOrder } from '@/services/order';

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

const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList = () => {
 
  /**
   * 分布更新窗口的弹窗
   */

  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  /**
   * 国际化配置
   */

  const intl = useIntl();
  const columns = [
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.orderNum"
          defaultMessage="订单编号"
        />
      ),
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
          text: (
            <Badge status="error" text="已取消" />
          ),
          status: 'wc-cancelled',
        },
        'wc-processing': {
          text: (
            <Badge status="processing" text="运行中" /> 
          ),
          status: 'wc-processing',
        },
        'wc-completed': {
          text: (
            <Badge status="success" text="已完成" />
          ),
          status: 'wc-completed',
        },
        'wc-pending': {
          text: (
            <Badge status="default" text="待处理" />  
          ),
          status: 'wc-pending',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.fulfillment" defaultMessage="发货状态" />,
      dataIndex: 'fulfillment_status',
      hideInForm: true,
      valueEnum: {
        'fulfilled': {
          text: (
            <FormattedMessage id="pages.searchTable.fulfilled" defaultMessage="已发货" />
          ),
          status: 'fulfilled',
        },
        'unfulfilled': {
          text: (
            <FormattedMessage id="pages.searchTable.unfulfilled" defaultMessage="未发货" />
          ),
          status: 'unfulfilled',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.orderAmount" defaultMessage="订单金额" />,
      dataIndex: 'order_total',
      sorter: true,
      hideInForm: true,
      renderText: (val, item) =>
        `${item.order_currency}${val}`,
    },
    {
      title: <FormattedMessage id="pages.searchTable.orderOption" defaultMessage="操作" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
            console.log(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.config" defaultMessage="查看" />
        </a>,
      
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: '查询表格',
        })}
        actionRef={actionRef}
        rowKey="number"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={false}
        request={async (params, sorter, filter) => {
          const res = await queryOrder({ ...params, sorter, filter })
          return { data: res.data, success: true, total:25 }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="已选择" />{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="服务调用次数总计"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="批量删除" />
          </Button>
          <Button type="primary">
            <FormattedMessage id="pages.searchTable.batchApproval" defaultMessage="批量审批" />
          </Button>
        </FooterToolbar>
      )}
{/* 
      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
        title={'抽屉'}
      >
        {currentRow?.name && (
          <ProDescriptions
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
     */}
    </PageContainer>
  );
};

export default TableList;
