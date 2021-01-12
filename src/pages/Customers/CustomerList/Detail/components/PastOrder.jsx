import React,{ useEffect } from 'react'
import { Space, Table } from 'antd'
import { connect } from 'umi'



const PastOrder = ({ ID, list, dispatch }) => {
  const columns = [
    {
      dataIndex: 'order_item_name',
      valueType: 'text',
      width: 150,
      render: (_,record) => (
        <Space direction="vertical">
          <span>{record.order_item_name}</span>
          <span>SKU: {record.sku}</span>
        </Space>
      ),
      align: 'center',
    },
    {
      dataIndex: 'order_item_type',
      valueType: 'text',
      align: 'center',
      render: (_,record) => (
        <Space>
          <span>{record.attrs.lengtn>0?record.attrs[0]:'-' }</span>
        </Space>
      ),
      
    },
    {
      dataIndex: 'qty',
      valueType: 'text',
      render: (_,record) => (
        <Space>
          <span>¥{record.price + '*' + record.qty}</span>
        </Space>
      ),
      align: 'center',
    },
    {
      dataIndex: 'line_total',
      valueType: 'money',
      align: 'center',
      render: (_,record) => (
        <Space>
          <span>¥{record.line_total}</span>
        </Space>
      ),
    },
    {
      dataIndex: 'line_tax',
      valueType: 'money',
      align: 'center',
      render: (_,record) => (
        <Space>
          <span>¥{record.line_tax}</span>
        </Space>
      ),
    },
  ];

    useEffect(async () => {
        await dispatch({
          type: 'customer/getOrderById',
          payload: { id: ID },
        });
      }, []);
      console.log(list,'past');
      const { data } = list
     
    
    return (
      <div>
          {data?.map((item, index) => (<div>
            <div style={{display:'flex', justifyContent:'space-between' }}>
               <div>订单编号：<a>{item.number}</a></div>
               <div>{item.paid_date}</div>
            </div>
             
              <Table
                columns={columns}
                dataSource={item.line_items}
              />
           </div>))
           }
        
      </div>
    )
}


const mapStateProps = ({ customer: { list } }) => {
    return { list };
  };

export default connect(mapStateProps)(PastOrder);

