import React, { useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { Card, Alert, Typography } from 'antd';
import { connect } from 'umi';
import styles from './index.less';
import CustomerMsg from './components/CustomerMsg';
import Address from './components/Address';
import PastOrder from './components/PastOrder'

const index = ({ user, dispatch, match }) => {
  useEffect(async () => {
    await dispatch({
      type: 'customer/getUserById',
      payload: { id: match.params.id },
    });
  }, []);
  console.log(user,'detail');
  return (
    <PageHeaderWrapper>
      <ProCard gutter={15} className={styles.bgcAll} bordered>
        <ProCard split="horizontal" colSpan="65%" className={styles.bgcLeft} bordered>
          <ProCard title="顾客信息" style={{ marginBottom: 15 }} bordered>
            <CustomerMsg user={user} />
          </ProCard>
          <ProCard title="历史订单" style={{ marginBottom: 15 }} bordered>
            <PastOrder ID={match.params.id}/>
          </ProCard>
        </ProCard>
        <ProCard title="收货地址" className={styles.conRight} bordered>
          <Address user={user} />
        </ProCard>
      </ProCard>
    </PageHeaderWrapper>
  );
};

const mapStateProps = ({ customer: { user, ID } }) => {
  return { user, ID };
};
export default connect(mapStateProps)(index);
