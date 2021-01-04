
export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'icon-shouye24',
                component: './Welcome',
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  },
                ],
              },
             
              {
                name: 'order',
                icon: 'icon-shangpinziliao24',
                path: '/OrderList',
                component: './OrderList',
              },
              {
                name: 'goods',
                icon: 'icon-dianpuxinxi24',
                path: '/Goods',
                routes: [
                  {
                    name: 'goodslist',
                    path: '/Goods/GoodsList/',
                    component: './Goods/GoodsList/',
                  },
                  {
                    name: 'sortlist',
                    path: '/Goods/SortList/',
                    component: './Goods/SortList/',
                  }
                ]
              },
              {
                name: 'customers',
                icon: 'icon-shouquanguanli24',
                path: '/Customers',
                component: './Customers'
              },
              {
                name: 'sys.setting',
                icon: 'icon-shezhi24',
                path: '/SysSetting',
                component: './SysSetting',
              },
              {
                name: 'list.table-list',
                icon: 'table',
                path: '/list',
                component: './ListTableList',
              },           
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
