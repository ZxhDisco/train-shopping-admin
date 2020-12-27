import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Tabs, Input, Space, Button, PageHeader, Table, Switch } from 'antd';
import styles from './index.less';
import TabTwo from './components/Tab2'

const { TabPane } = Tabs;
const secureSettingData = ['当前密码', '新密码', '确认新密码'];
const paySettingData = ['Username', 'Password', 'Signature'];

const index = () => {
  return (
    <PageHeaderWrapper>
      <Card>
        <Tabs tabPosition="left" defaultActiveKey="1" size="large">
          <TabPane tab="安全设置" key="1">
            <PageHeader title="修改密码">
              <Space direction="vertical">
                {secureSettingData.map((item) => (
                  <Space key={item}>
                    <div className={styles.passDiv}>{item}：</div>
                    <Input.Password />
                  </Space>
                ))}
                <Button type="primary">提交</Button>
              </Space>
            </PageHeader>
          </TabPane>

          <TabPane tab="物流设置" key="2">
            <PageHeader title="物流方案">
            <TabTwo />
            </PageHeader>
          </TabPane>

          <TabPane tab="支付设置" key="3">
            <PageHeader title="支付方式">
              <Card>
                <div style={{ border: '1px solid blue' }}>
                  <span>快速结账</span>
                </div>
                <br />
                <Space direction="vertical" style={{borderRight:'1px solid red', padding:'10px 120px 10px 20px'}}>
                  <div>
                    <Switch /> <span>sandbox</span>
                  </div>
                  {paySettingData.map((item) => (
                    <Space key={item}>
                      <div className={styles.passDiv}>
                        <span style={{ color: 'red' }}>*</span> {item}:
                      </div>{' '}
                      <Input placeholder="请输入" />
                    </Space>
                  ))}

                  <Button type="primary">绑定</Button>
                </Space>
      
              </Card>
            </PageHeader>
          </TabPane>
        </Tabs>
      </Card>
    </PageHeaderWrapper>
  );
};

export default index;
