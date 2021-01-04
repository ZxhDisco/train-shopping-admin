import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, SelectLang, useIntl, connect, FormattedMessage } from 'umi';
import React from 'react';
import styles from './UserLayout.less';
import { Card,Space } from 'antd'

const UserLayout = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={title} />
        </Helmet>
        <div className={styles.container}>
          <div className={styles.lang}>
            <SelectLang />
          </div>
          <Card className={styles.userCard}>
            <Space className={styles.contentLeft} >
              {children}
            </Space>
            <Space className={styles.contentRight}>
              <img src="https://d1icd6shlvmxi6.cloudfront.net/gsc/TP70UK/17/ea/32/17ea325d2e564dae8cbee715204e0429/images/%E7%99%BB%E5%BD%95%E9%A1%B5/u8.png?token=0c0f73fc21deede776e7d1b49c794cc545ebba244031cdaf687a9e365a38262a" alt="bgc"/>
            </Space>
          </Card>
          {/* <DefaultFooter /> */}
        </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
