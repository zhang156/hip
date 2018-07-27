const deleteButton =  (vm, h, currentRow, index) => {
  return h('Poptip', {
    props: {
      confirm: true,
      title: '您确定要删除当前数据吗?',
      transfer: true,
    },
    on: {
      'on-ok': () => {
        vm.modelData.splice(index, 1);
        vm.$emit('input', vm.modelData);
        vm.$emit('on-delete', vm.modelData, index);
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
        size: 'small'
      }
    }, '删除')
  ]);
};

export default deleteButton
