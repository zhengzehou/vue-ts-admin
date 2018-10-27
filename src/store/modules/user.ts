// import { loginByEmail, logout, getInfo } from 'api/login'
import Cookies from 'js-cookie'
import { Commit } from 'vuex'

export interface UserState {
  user: string
  status: string
  email: string
  code: string
  uid: string
  auth_type: string
  token: string
  name: string
  avatar: string
  introduction: string
  roles: Array<any>
  setting: {}
}
const initUserState: UserState = {
  user: '',
  status: '',
  email: '',
  code: '',
  uid: '',
  auth_type: '',
  token: Cookies.get('Admin-Token') || '',
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  setting: {
    articlePlatform: []
  }
}
const user = {
  state: initUserState,

  mutations: {
    SET_AUTH_TYPE: (state: UserState, type: string) => {
      state.auth_type = type
    },
    SET_CODE: (state: UserState, code: string) => {
      state.code = code
    },
    SET_TOKEN: (state: UserState, token: string) => {
      state.token = token
    },
    SET_UID: (state: UserState, uid: string) => {
      state.uid = uid
    },
    SET_EMAIL: (state: UserState, email: string) => {
      state.email = email
    },
    SET_INTRODUCTION: (state: UserState, introduction: string) => {
      state.introduction = introduction
    },
    SET_SETTING: (state: UserState, setting: any) => {
      state.setting = setting
    },
    SET_STATUS: (state: UserState, status: string) => {
      state.status = status
    },
    SET_NAME: (state: UserState, name: string) => {
      state.name = name
    },
    SET_AVATAR: (state: UserState, avatar: string) => {
      state.avatar = avatar
    },
    SET_ROLES: (state: UserState, roles: any) => {
      state.roles = roles
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: (state: UserState) => {
      state.user = ''
    }
  },

  actions: {
    // 邮箱登录
    // LoginByEmail(context: { commit: Commit }, userInfo) {
    //   const email = userInfo.email.trim()
    //   return new Promise((resolve, reject) => {
    //     loginByEmail(email, userInfo.password)
    //       .then(response => {
    //         const data = response.data
    //         console.log(response.data)
    //         Cookies.set('Admin-Token', response.data.token)
    //         commit('SET_TOKEN', data.token)
    //         commit('SET_EMAIL', email)
    //         resolve()
    //       })
    //       .catch(error => {
    //         reject(error)
    //       })
    //   })
    // },

    // 获取用户信息
    // GetInfo(context: { commit: Commit; state: UserState }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo(state.token)
    //       .then(response => {
    //         const data = response.data
    //         commit('SET_ROLES', data.role)
    //         commit('SET_NAME', data.name)
    //         commit('SET_AVATAR', data.avatar)
    //         commit('SET_UID', data.uid)
    //         commit('SET_INTRODUCTION', data.introduction)
    //         resolve(response)
    //       })
    //       .catch(error => {
    //         reject(error)
    //       })
    //   })
    // },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(
    //       state.status,
    //       state.email,
    //       state.code,
    //       state.auth_type
    //     )
    //       .then(response => {
    //         commit('SET_TOKEN', response.data.token)
    //         Cookies.set('Admin-Token', response.data.token)
    //         resolve()
    //       })
    //       .catch(error => {
    //         reject(error)
    //       })
    //   })
    // },

    // 登出
    LogOut(context: { commit: Commit; state: UserState }) {
      return new Promise((resolve, reject) => {
        // logout(state.token)
        //   .then(() => {
        context.commit('SET_TOKEN', '')
        context.commit('SET_ROLES', [])
        Cookies.remove('Admin-Token')
        resolve()
        // })
        // .catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut(context: { commit: Commit }) {
      return new Promise(resolve => {
        context.commit('SET_TOKEN', '')
        Cookies.remove('Admin-Token')
        alert('has logout')
        resolve()
      })
    },

    // 动态修改权限
    ChangeRole(context: { commit: Commit }, role: string) {
      return new Promise(resolve => {
        context.commit('SET_ROLES', [role])
        context.commit('SET_TOKEN', role)
        Cookies.set('Admin-Token', role)
        resolve()
      })
    }
  }
}

export default user
