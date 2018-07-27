const optStatus = {
  'A': '新增',
  'U': '修改',
  'D': '删除',
  'H': '历史'
}
/*
 * TO_AUDIT("0", "待审批"),
 TO_BE_RELEASED("1", "待发布"),
 RELEASED("2", "已发布"),
 REJECTED("4", "驳回");
 */
const reStatus = {
  '0': '待审批',
  '1': '待发布',
  '2': '已发布',
  '4': '驳回'
}

export const selection = {
  type: 'selection',
  width: 60,
  align: 'center'
};
export const index = {
  type: 'index',
  width: 60,
  align: 'center'
};

export const status = [
  {
    title: '编辑状态',
    key: 'OPT_STATUS_CODE',
    render: (h, params) => {
      return h('span', {}, optStatus[params.row.OPT_STATUS_CODE])
    }
  },
  {
    title: '发布状态',
    key: 'STATUS_CODE',
    render: (h, params) => {
      return h('span', {}, reStatus[params.row.STATUS_CODE])
    }
  },
]

export const action = (vm) => {
  return {
    title: '操作',
    key: 'action',
    width: '150',
    render: (h, params) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small',
            disabled: params.row.OPT_STATUS_CODE == 'D'
          },
          on: {
            click: () => {
              vm.edit(params.row)
            }
          }
        }, '编辑'),
        h('Poptip', {
          props: {
            confirm: true,
            title: '您确定要删除当前数据吗?',
            transfer: true,

          },
          on: {
            'on-ok': () => {
              /*vm.masterData.splice(params.index, 1);
               vm.$emit('input', vm.masterData);*/
              vm.onDelete(params.index);
            }
          }
        }, [
          h('Button', {
            style: {
              margin: '0 5px'
            },
            props: {
              type: 'error',
              placement: 'top',
              size: 'small',
              disabled: params.row.OPT_STATUS_CODE == 'D'
            }
          }, '删除')
        ])
      ])
    }
  }
};

export const approvalAction = (vm) => {
  return {
    title: '操作',
    key: 'action',
    width: '150',
    render: (h, params) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small',
            /*disabled: params.row.OPT_STATUS_CODE == 'U'*/
          },
          on: {
            click: () => {
              vm.detailLog(params.row)
            }
          }
        }, '变更详细')
      ])
    }
  }
};
