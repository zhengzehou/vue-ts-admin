import { State } from './index'
// import { GetterTree } from 'vuex'
const getters = {
  sidebar: (state: State) => state.app.sidebar,
  visitedViews: (state: State) => state.app.visitedViews,
  token: (state: State) => state.user.token,
  avatar: (state: State) => state.user.avatar,
  name: (state: State) => state.user.name,
  uid: (state: State) => state.user.uid,
  email: (state: State) => state.user.email,
  introduction: (state: State) => state.user.introduction,
  auth_type: (state: State) => state.user.auth_type,
  status: (state: State) => state.user.status,
  roles: (state: State) => state.user.roles,
  setting: (state: State) => state.user.setting,
  permission_routers: (state: State) => state.permission.routers,
  addRouters: (state: State) => state.permission.addRouters,
  siderbar_routers: (state: State) => state.permission.siderbar_routers
}

export default getters
