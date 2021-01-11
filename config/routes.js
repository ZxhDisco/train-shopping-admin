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
                path: '/Order',
                name: 'order',
                icon: 'icon-shangpinziliao24',             
                routes: [
                  {
                    path: '/Order/OrderList',
                    name: 'allOrder',
                    component: './Order/OrderList',
                  },
                  {
                    path: '/Order/OrderList/Detail',
                    component: './Order/OrderList/Detail',
                  },
                ],
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
                  },
                  {
                    path: '/Goods/SortList/demo',
                    component: './Goods/SortList/demo',
                  }
                ],
              },
              {
                name: 'customers',
                icon: 'icon-shouquanguanli24',
                path: '/Customers',
                routes: [
                  {
                    name:'allCustomers',
                    path:'/Customers/CustomerList',
                    component:'./Customers/CustomerList'
                  },
                  {
                    path:'/Customers/CustomerList/Detail',
                    component:'./Customers/CustomerList/Detail'
                  }
                ]
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
