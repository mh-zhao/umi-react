export default {
  namespace: 'common',
  state: {
    breadcrumb: [], //面包屑导航
    count: 10,
    isFull: false, //全屏
    collapsed: false, //菜单折叠
  },
  reducers: {
    save(state:any, { payload }) {
      return {...state, ...payload}
    }
  },
  effects: {

  }
}