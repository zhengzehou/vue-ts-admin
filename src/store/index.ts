import Vue from 'vue'
import Vuex, { Commit, Dispatch } from 'vuex'
import app, { AppState } from './modules/app'
import user, { UserState } from './modules/user'
import permission, { PermissionState } from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    app,
    user,
    permission
  }
})

// export default store

export interface ActionContextBasic {
  commit: Commit
  dispatch: Dispatch
}

export interface State {
  user: UserState
  app: AppState
  permission: PermissionState
}
