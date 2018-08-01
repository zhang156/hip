import Mock from 'mockjs';

const APP = process.env.APP
const NODE_ENV = process.env.NODE_ENV

Mock.mock(/oauth\/login/, () => {
  console.log('login')
  return {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbImFsbCJdLCJleHAiOjE1MzMwNDUzNDQsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwianRpIjoiMTU3Y2ZhY2EtN2JjNS00NDlhLWIyNDItMTMwNWNlY2EwYWI3IiwiY2xpZW50X2lkIjoic2FhcyJ9.GhXzUyFOPk3HT8VdwNiZwh0PZMxaZofdRNYKPtbRnT4",
    "token_type": "bearer",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbImFsbCJdLCJhdGkiOiIxNTdjZmFjYS03YmM1LTQ0OWEtYjI0Mi0xMzA1Y2VjYTBhYjciLCJleHAiOjE1MzU1OTQxNDQsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwianRpIjoiN2Y4ODY0ZTAtYjI4NS00ZmM5LWJmMGUtMjc3M2FhMjk1ZGZmIiwiY2xpZW50X2lkIjoic2FhcyJ9.0drsCCTIwhYIH4kTLFpVy1GIgb25gK8PG2FZEVD2ce8",
    "expires_in": 7200,
    "scope": "all",
    "user_id": 1,
    "jti": "157cfaca-7bc5-449a-b242-1305ceca0ab7"
  }
});

Mock.mock(/profile/, () => {
  console.log('profile')
  return {
    user: {
      id: 1,
      username: 'admin',
      nickName: '管理员',
      password: null,
      genderCode: '1',
      genderName: '男',
      deptCode: '00000',
      deptName: '全院',
      orgCode: '99999',
      orgName: 'xxx医院',
      email: 'admin@hospital.com',
      phone: '18912345678',
      status: '1',
      lastLoginTime: '2018-4-19 11:25:00',
      description: '系统管理员'
    },
    role: [
      'ROLE_ADMIN'
    ],
    permission: [
      'User:view', 'User:create', 'User:update', 'User:delete', 'Role:view', 'Role:create', 'Role:update', 'Role:delete', 'Resource:view', 'Resource:create', 'Resource:update', 'Resource:delete',
      'Organization:view', 'Organization:create', 'Organization:update', 'Organization:delete'
    ]
  }
});

Mock.mock(/sysMenu/, () => {
  let public_menu = [
    {
      "id": 1468,
      "createBy": "admin",
      "createTime": "2018-05-15T07:17:35.000+0000",
      "updateCount": 0,
      "updateBy": null,
      "updateTime": null,
      "deleteFlag": "0",
      "deleteTime": null,
      "sortBy": null,
      "children": [{
          "id": 1474,
          "createBy": "admin",
          "createTime": "2018-05-15T07:20:57.000+0000",
          "updateCount": 0,
          "updateBy": null,
          "updateTime": null,
          "deleteFlag": "0",
          "deleteTime": null,
          "sortBy": null,
          "children": [],
          "parentId": 1468,
          "resourceName": "访问日志",
          "resourceUrl": "/sys-monitor/weblog",
          "resourceType": "1",
          "permission": "Weblog:view",
          "icon": null,
          "orderNo": null,
          "requestType": null,
          "appId": 0,
          "appName": "通用基础模块",
          "appIds": null,
          "viewComponent": null,
          "viewUrl": null
        },
        {
          "id": 1471,
          "createBy": "admin",
          "createTime": "2018-05-15T07:20:03.000+0000",
          "updateCount": 0,
          "updateBy": null,
          "updateTime": null,
          "deleteFlag": "0",
          "deleteTime": null,
          "sortBy": null,
          "children": [],
          "parentId": 1468,
          "resourceName": "在线用户",
          "resourceUrl": "/sys-monitor/online-user",
          "resourceType": "1",
          "permission": "OnlineUser:view",
          "icon": null,
          "orderNo": null,
          "requestType": null,
          "appId": 0,
          "appName": "通用基础模块",
          "appIds": null,
          "viewComponent": null,
          "viewUrl": null
        }
      ],
      "parentId": 0,
      "resourceName": "系统监控",
      "resourceUrl": "/sys-monitor",
      "resourceType": "1",
      "permission": null,
      "icon": "monitor",
      "orderNo": null,
      "requestType": null,
      "appId": 0,
      "appName": "通用基础模块",
      "appIds": null,
      "viewComponent": null,
      "viewUrl": null
    },
    {
      "id": 1,
      "createBy": "admin",
      "createTime": "2018-05-04T08:59:14.000+0000",
      "updateCount": 0,
      "updateBy": null,
      "updateTime": null,
      "deleteFlag": "0",
      "deleteTime": null,
      "sortBy": null,
      "children": [{
          "id": 1486,
          "createBy": "admin",
          "createTime": "2018-05-15T07:24:03.000+0000",
          "updateCount": 0,
          "updateBy": null,
          "updateTime": null,
          "deleteFlag": "0",
          "deleteTime": null,
          "sortBy": null,
          "children": [],
          "parentId": 1,
          "resourceName": "系统配置",
          "resourceUrl": "/system/sys-config",
          "resourceType": "1",
          "permission": "Sysconfig:view",
          "icon": null,
          "orderNo": null,
          "requestType": null,
          "appId": 0,
          "appName": "通用基础模块",
          "appIds": null,
          "viewComponent": null,
          "viewUrl": null
        },
        {
          "id": 1483,
          "createBy": "admin",
          "createTime": "2018-05-15T07:23:34.000+0000",
          "updateCount": 0,
          "updateBy": null,
          "updateTime": null,
          "deleteFlag": "0",
          "deleteTime": null,
          "sortBy": null,
          "children": [],
          "parentId": 1,
          "resourceName": "系统字典",
          "resourceUrl": "/system/sys-dict",
          "resourceType": "1",
          "permission": "SysDict:view",
          "icon": null,
          "orderNo": null,
          "requestType": null,
          "appId": 0,
          "appName": "通用基础模块",
          "appIds": null,
          "viewComponent": null,
          "viewUrl": null
        },
        {
          "id": 14,
          "createBy": "admin",
          "createTime": "2018-05-04T09:02:58.000+0000",
          "updateCount": 0,
          "updateBy": null,
          "updateTime": null,
          "deleteFlag": "0",
          "deleteTime": null,
          "sortBy": null,
          "children": [],
          "parentId": 1,
          "resourceName": "机构管理",
          "resourceUrl": "/system/organization",
          "resourceType": "1",
          "permission": "Organization:view",
          "icon": null,
          "orderNo": null,
          "requestType": null,
          "appId": 0,
          "appName": "通用基础模块",
          "appIds": null,
          "viewComponent": null,
          "viewUrl": null
        },
        {
          "id": 13,
          "createBy": "admin",
          "createTime": "2018-05-04T09:02:36.000+0000",
          "updateCount": 0,
          "updateBy": null,
          "updateTime": null,
          "deleteFlag": "0",
          "deleteTime": null,
          "sortBy": null,
          "children": [],
          "parentId": 1,
          "resourceName": "权限管理",
          "resourceUrl": "/system/resource",
          "resourceType": "1",
          "permission": "Resource:view",
          "icon": null,
          "orderNo": null,
          "requestType": null,
          "appId": 0,
          "appName": "通用基础模块",
          "appIds": null,
          "viewComponent": null,
          "viewUrl": null
        },
        {
          "id": 12,
          "createBy": "admin",
          "createTime": "2018-05-04T09:02:09.000+0000",
          "updateCount": 0,
          "updateBy": null,
          "updateTime": null,
          "deleteFlag": "0",
          "deleteTime": null,
          "sortBy": null,
          "children": [],
          "parentId": 1,
          "resourceName": "角色管理",
          "resourceUrl": "/system/role",
          "resourceType": "1",
          "permission": "Role:view",
          "icon": null,
          "orderNo": null,
          "requestType": null,
          "appId": 0,
          "appName": "通用基础模块",
          "appIds": null,
          "viewComponent": null,
          "viewUrl": null
        },
        {
          "id": 11,
          "createBy": "admin",
          "createTime": "2018-05-04T09:00:12.000+0000",
          "updateCount": 0,
          "updateBy": null,
          "updateTime": null,
          "deleteFlag": "0",
          "deleteTime": null,
          "sortBy": null,
          "children": [],
          "parentId": 1,
          "resourceName": "用户管理",
          "resourceUrl": "/system/user",
          "resourceType": "1",
          "permission": "User:view",
          "icon": null,
          "orderNo": null,
          "requestType": null,
          "appId": 0,
          "appName": "通用基础模块",
          "appIds": null,
          "viewComponent": null,
          "viewUrl": null
        }
      ],
      "parentId": 0,
      "resourceName": "系统管理",
      "resourceUrl": "/system",
      "resourceType": "1",
      "permission": null,
      "icon": "ios-gear",
      "orderNo": null,
      "requestType": null,
      "appId": 0,
      "appName": "通用基础模块",
      "appIds": null,
      "viewComponent": null,
      "viewUrl": null
    }
  ]

  // let public_menu = [
  //   {
  //     id: 0,
  //     parentId: 0,
  //     resourceName: '首页',
  //     resourceUrl: '/home',
  //     name: 'home',
  //     resourceType: '1',
  //     permission: '',
  //     icon: 'icon-home-solid',
  //     viewComponent: 'home.vue',
  //     viewUrl: '@/views/home/'
  //   },
  //   {
  //     id: 1,
  //     parentId: 0,
  //     resourceName: '系统管理',
  //     resourceUrl: '/system',
  //     name: 'system',
  //     resourceType: '1',
  //     permission: '',
  //     icon: 'icon-iosgear',
  //     children: [
  //       {
  //         id: 11,
  //         parentId: 1,
  //         name: 'user',
  //         resourceName: '用户管理',
  //         resourceUrl: '/system/user',
  //         resourceType: '1',
  //         permission: 'User:view',
  //         icon: '',
  //         viewComponent: 'index.vue',
  //         viewUrl: '@/views/system/user/'
  //       },
  //       {
  //         id: 12,
  //         parentId: 1,
  //         name: 'role',
  //         resourceName: '角色管理',
  //         resourceUrl: '/system/role',
  //         resourceType: '1',
  //         permission: 'Role:view',
  //         icon: '',
  //         viewComponent: '',
  //         viewUrl: '@/views/system/role'
  //       },
  //       {
  //         id: 13,
  //         parentId: 1,
  //         name: 'resource',
  //         resourceName: '权限管理',
  //         resourceUrl: '/system/resource',
  //         resourceType: '1',
  //         permission: 'Resource:view',
  //         icon: '',
  //         viewComponent: '',
  //         viewUrl: '@/views/system/resource'
  //       },
  //       {
  //         id: 14,
  //         parentId: 1,
  //         name: 'organization',
  //         resourceName: '机构管理',
  //         resourceUrl: '/system/organization',
  //         resourceType: '1',
  //         permission: 'Organization:view',
  //         icon: '',
  //         viewComponent: '',
  //         viewUrl: '@/views/system/organization'
  //       },
  //       {
  //         id: 15,
  //         parentId: 1,
  //         name: 'dict',
  //         resourceName: '系统字典',
  //         resourceUrl: '/system/dict',
  //         resourceType: '1',
  //         permission: 'Dict:view',
  //         icon: '',
  //         viewComponent: '',
  //         viewUrl: '@/views/system/dict'
  //       },
  //       {
  //         id: 16,
  //         parentId: 1,
  //         name: 'config',
  //         resourceName: '系统配置',
  //         resourceUrl: '/system/config',
  //         resourceType: '1',
  //         permission: 'Config:view',
  //         icon: '',
  //         viewComponent: '',
  //         viewUrl: '@/views/system/config'
  //       }
  //     ]
  //   }
  // ]

  let app_menu = []

  if (NODE_ENV == 'development') {
    switch (APP) {
      case 'mdm':
        {
          app_menu = [{
              id: 2,
              parentId: 0,
              name: 'dataModel',
              resourceUrl: '/dataModel',
              resourceName: '主数据管理',
              icon: 'social-buffer-outline',
              children: [{
                  id: 21,
                  parentId: 2,
                  name: 'modeling',
                  resourceUrl: '/dataModel/modeling',
                  resourceName: '数据建模',
                  icon: ''
                },
                {
                  id: 22,
                  parentId: 2,
                  name: 'mdMaintain',
                  resourceUrl: '/dataModel/mdMaintain',
                  resourceName: '主数据维护',
                  icon: ''
                }
              ]
            },
            {
              id: 3,
              parentId: 0,
              name: 'versioning',
              resourceUrl: '/versioning',
              resourceName: '审批发布',
              icon: 'android-checkbox-outline',
              children: [{
                  id: 31,
                  parentId: 3,
                  name: 'mdApproval',
                  resourceUrl: '/versioning/mdApproval',
                  resourceName: '术语审批',
                  icon: ''
                },
                {
                  id: 32,
                  parentId: 3,
                  name: 'mdRelease',
                  resourceUrl: '/versioning/mdRelease',
                  resourceName: '术语发布',
                  icon: ''
                }
              ]
            },
            {
              id: 4,
              parentId: 0,
              name: 'interact',
              resourceUrl: '/interact',
              resourceName: '术语同步',
              icon: 'android-sync',
              children: [{
                  id: 41,
                  parentId: 4,
                  name: 'ds',
                  resourceUrl: '/interact/dataSource',
                  resourceName: '数据源',
                  icon: ''
                },
                {
                  id: 62,
                  parentId: 4,
                  name: 'mdSync',
                  resourceUrl: '/interact/mdSync',
                  resourceName: '术语同步',
                  icon: ''
                },
                {
                  id: 63,
                  parentId: 4,
                  name: 'mdMapping',
                  resourceUrl: '/interact/mdMapping',
                  resourceName: '术语对照',
                  icon: ''
                }
              ]
            },
            {
              id: 5,
              parentId: 0,
              name: 'share',
              resourceUrl: '/share',
              resourceName: '共享规范',
              icon: 'ios-gear',
              children: [{
                  id: 71,
                  parentId: 5,
                  name: 'cv',
                  resourceUrl: '/share/cv',
                  resourceName: '标准值域代码',
                  icon: ''
                },
                {
                  id: 72,
                  parentId: 5,
                  name: 'element',
                  resourceUrl: '/share/elementData',
                  resourceName: '数据元',
                  icon: ''
                },
                {
                  id: 73,
                  parentId: 5,
                  name: 'set',
                  resourceUrl: '/share/set',
                  resourceName: '数据集',
                  icon: ''
                }
              ]
            }
          ]
        }

      case 'empi':
        {

        }

      case 'im':
        {

        }
    }
  }

  public_menu = app_menu.concat(public_menu)

  return public_menu
});

Mock.mock(/Permission/, () => {
  return ['User:view', 'User:create', 'User:update', 'User:delete', 'Role:view', 'Role:create', 'Role:update', 'Role:delete',
    'Resource:view', 'Resource:create', 'Resource:update', 'Resource:delete',
    'Organization:view', 'Organization:create', 'Organization:update', 'Organization:delete'
  ]
});

Mock.mock(/SysUserSetting/, () => {
  return {
    homePage: '/system/user'
  }
})

Mock.mock(/SysUser/, () => {
  return {
    total: 1,
    list: [{
      id: 1,
      username: 'admin',
      nickName: '管理员',
      password: null,
      genderCode: '1',
      genderName: '男',
      deptCode: '00000',
      deptName: '全院',
      orgCode: '99999',
      orgName: 'xxx医院',
      email: 'admin@hospital.com',
      phone: '18912345678',
      status: '1',
      lastLoginTime: '2018-4-19 11:25:00',
      description: '系统管理员',
      roles: [{
        id: 1,
        roleCode: 'ROLE_ADMIN',
        roleName: '管理员',
        description: '系统管理员,拥有所有权限'
      }]
    }]
  }
});

Mock.mock(/SysRole/, () => {
  return {
    total: 2,
    list: [{
        id: 1,
        roleCode: 'ROLE_ADMIN',
        roleName: '管理员',
        description: '系统管理员,拥有所有权限',
        resources: [{
          id: 1,
          parentId: 0,
          resourceName: '系统管理',
          resourceUrl: '/system',
          resourceType: '1',
          permission: '',
          icon: 'ios-gear',
          children: [{
              id: 11,
              parentId: 1,
              resourceName: '用户管理',
              resourceUrl: '/system/user',
              resourceType: '1',
              permission: 'User:view',
              icon: '',
              children: [{
                  id: 111,
                  parentId: 11,
                  resourceName: '新增用户',
                  resourceUrl: null,
                  resourceType: '2',
                  permission: 'User:create',
                  icon: ''
                },
                {
                  id: 112,
                  parentId: 11,
                  resourceName: '修改用户',
                  resourceUrl: null,
                  resourceType: '2',
                  permission: 'User:update',
                  icon: ''
                },
                {
                  id: 113,
                  parentId: 11,
                  resourceName: '删除用户',
                  resourceUrl: null,
                  resourceType: '2',
                  permission: 'User:delete',
                  icon: ''
                }
              ]
            },
            {
              id: 12,
              parentId: 1,
              resourceName: '角色管理',
              resourceUrl: '/system/role',
              resourceType: '1',
              permission: 'Role:view',
              icon: ''
            },
            {
              id: 13,
              parentId: 1,
              resourceName: '权限管理',
              resourceUrl: '/system/resource',
              resourceType: '1',
              permission: 'Resource:view',
              icon: ''
            },
            {
              id: 14,
              parentId: 1,
              resourceName: '机构管理',
              resourceUrl: '/system/organization',
              resourceType: '1',
              permission: 'Organization:view',
              icon: ''
            }
          ]
        }]
      },
      {
        id: 1,
        roleCode: 'ROLE_USER_VIEW',
        roleName: '查看用户',
        description: '拥有所有查看权限'
      }
    ]
  }
});

Mock.mock(/SysResource\/_all/, () => {
  return [{
    id: 1,
    parentId: 0,
    resourceName: '系统管理',
    resourceUrl: '/system',
    resourceType: '1',
    permission: '',
    icon: 'ios-gear',
    children: [{
        id: 11,
        parentId: 1,
        resourceName: '用户管理',
        resourceUrl: '/system/user',
        resourceType: '1',
        permission: 'User:view',
        icon: '',
        children: [{
            id: 111,
            parentId: 11,
            resourceName: '新增用户',
            resourceUrl: null,
            resourceType: '2',
            permission: 'User:create',
            icon: ''
          },
          {
            id: 112,
            parentId: 11,
            resourceName: '修改用户',
            resourceUrl: null,
            resourceType: '2',
            permission: 'User:update',
            icon: ''
          },
          {
            id: 113,
            parentId: 11,
            resourceName: '删除用户',
            resourceUrl: null,
            resourceType: '2',
            permission: 'User:delete',
            icon: ''
          }
        ]
      },
      {
        id: 12,
        parentId: 1,
        resourceName: '角色管理',
        resourceUrl: '/system/role',
        resourceType: '1',
        permission: 'Role:view',
        icon: ''
      },
      {
        id: 13,
        parentId: 1,
        resourceName: '权限管理',
        resourceUrl: '/system/resource',
        resourceType: '1',
        permission: 'Resource:view',
        icon: ''
      },
      {
        id: 14,
        parentId: 1,
        resourceName: '机构管理',
        resourceUrl: '/system/organization',
        resourceType: '1',
        permission: 'Organization:view',
        icon: ''
      }
    ]
  }]
});

Mock.mock(/Dept/, () => {
  return [{
    id: 1,
    orgCode: '99999',
    orgName: 'xxxx医院',
    deptCode: null,
    deptName: null,
    children: [{
        id: 11,
        orgCode: '99999',
        orgName: 'xxxx医院',
        deptCode: '00000',
        deptName: '全院'
      },
      {
        id: 12,
        orgCode: '99999',
        orgName: 'xxxx医院',
        deptCode: '00001',
        deptName: '信息中心'
      },
      {
        id: 13,
        orgCode: '99999',
        orgName: 'xxxx医院',
        deptCode: '00003',
        deptName: '神经内科'
      }
    ]
  }]
})
