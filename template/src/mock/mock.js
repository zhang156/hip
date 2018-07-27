import Mock from 'mockjs';

const APP = process.env.APP
const NODE_ENV = process.env.NODE_ENV

Mock.mock(/login/, () => {
  return {
    msg: '登录成功', 
    token: 'fXG-3oQSqjM3-VdsG2rya0_wvb9y_wgeWZxpyVhZyaX8fsEC', 
    user: {
      username: 'admin'
    }
  }
});

Mock.mock(/profile/, () => {
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
    role: {},
    permission: {}
  }
});

Mock.mock(/sysMenu/, () => {
  let public_menu = [
    {
      id: 1,
      parentId: 0,
      resourceName: '系统管理',
      resourceUrl: '/system',
      name: 'system',
      resourceType: '1',
      permission: '',
      icon: 'ios-gear',
      children: [
        {
          id: 11,
          parentId: 1,
          name: 'user',
          resourceName: '用户管理',
          resourceUrl: '/system/user',
          resourceType: '1',
          permission: 'User:view',
          icon: ''
        },
        {
          id: 12,
          parentId: 1,
          name: 'role',
          resourceName: '角色管理',
          resourceUrl: '/system/role',
          resourceType: '1',
          permission: 'Role:view',
          icon: ''
        },
        {
          id: 13,
          parentId: 1,
          name: 'resource',
          resourceName: '权限管理',
          resourceUrl: '/system/resource',
          resourceType: '1',
          permission: 'Resource:view',
          icon: ''
        },
        {
          id: 14,
          parentId: 1,
          name: 'organization',
          resourceName: '机构管理',
          resourceUrl: '/system/organization',
          resourceType: '1',
          permission: 'Organization:view',
          icon: ''
        },
        {
          id: 15,
          parentId: 1,
          name: 'dict',
          resourceName: '系统字典',
          resourceUrl: '/system/dict',
          resourceType: '1',
          permission: 'Dict:view',
          icon: ''
        },
        {
          id: 16,
          parentId: 1,
          name: 'config',
          resourceName: '系统配置',
          resourceUrl: '/system/config',
          resourceType: '1',
          permission: 'Config:view',
          icon: ''
        }
      ]
    }
  ]
  let app_menu = []

  if (NODE_ENV == 'development') {
    switch (APP) {
      case 'mdm': {
        app_menu = [
          {
            id: 2,
            parentId: 0,
            name: 'dataModel',
            resourceUrl: '/dataModel',
            resourceName: '主数据管理',
            icon: 'social-buffer-outline',
            children: [
              {
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
            children: [
              {
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
            children: [
              {
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
            children: [
              {
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

      case 'empi': {

      }

      case 'im': {

      }
    }
  }

  public_menu = app_menu.concat(public_menu)
  
  return public_menu
});

Mock.mock(/Permission/, () => {
  return ['User:view', 'User:create', 'User:update', 'User:delete', 'Role:view', 'Role:create', 'Role:update', 'Role:delete',
    'Resource:view', 'Resource:create', 'Resource:update', 'Resource:delete',
    'Organization:view', 'Organization:create', 'Organization:update', 'Organization:delete']
});

Mock.mock(/SysUserSetting/, () => {
  return {homePage: '/system/user'}
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
      roles: [
        {
          id: 1,
          roleCode: 'ROLE_ADMIN',
          roleName: '管理员',
          description: '系统管理员,拥有所有权限'
        }
      ]
    }]
  }
});

Mock.mock(/SysRole/, () => {
  return {
    total: 2,
    list: [
      {
        id: 1,
        roleCode: 'ROLE_ADMIN',
        roleName: '管理员',
        description: '系统管理员,拥有所有权限',
        resources: [
          {
            id: 1,
            parentId: 0,
            resourceName: '系统管理',
            resourceUrl: '/system',
            resourceType: '1',
            permission: '',
            icon: 'ios-gear',
            children: [
              {
                id: 11,
                parentId: 1,
                resourceName: '用户管理',
                resourceUrl: '/system/user',
                resourceType: '1',
                permission: 'User:view',
                icon: '',
                children: [
                  {
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
          }
        ]
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
  return [
    {
      id: 1,
      parentId: 0,
      resourceName: '系统管理',
      resourceUrl: '/system',
      resourceType: '1',
      permission: '',
      icon: 'ios-gear',
      children: [
        {
          id: 11,
          parentId: 1,
          resourceName: '用户管理',
          resourceUrl: '/system/user',
          resourceType: '1',
          permission: 'User:view',
          icon: '',
          children: [
            {
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
    }
  ]
});

Mock.mock(/Dept/, () => {
  return [
    {
      id: 1,
      orgCode: '99999',
      orgName: 'xxxx医院',
      deptCode: null,
      deptName: null,
      children: [
        {
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
    }
  ]
})
