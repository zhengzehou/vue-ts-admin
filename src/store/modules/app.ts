import Cookies from 'js-cookie'
import { Commit } from 'vuex'
import * as types from '../mutation-types'

export interface AppState {
  sidebar: { opened: boolean }
  theme: 'default'
  livenewsChannels: string
  visitedViews: Array<any>
}
const initState: AppState = {
  sidebar: { opened: !Cookies.get('sidebarStatus') },
  theme: 'default',
  livenewsChannels: Cookies.get('livenewsChannels') || '[]',
  visitedViews: []
}

// mutations
const mutations = {
  [types.TOGGLE_SIDEBAR](state: AppState) {
    debugger
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', '1')
    } else {
      Cookies.set('sidebarStatus', '0')
    }
    state.sidebar.opened = !state.sidebar.opened
  },
  [types.ADD_VISITED_VIEWS]: (state: AppState, view: any) => {
    if (state.visitedViews.indexOf(view)) return
    state.visitedViews.push(view)
  },
  [types.DEL_VISITED_VIEWS]: (state: AppState, view: any) => {
    const index = state.visitedViews.indexOf(view)
    state.visitedViews.splice(index, 1)
  }
}

// actions
const actions = {
  toggleSideBar(context: { commit: Commit; state: AppState }) {
    context.commit(types.TOGGLE_SIDEBAR)
  },
  addVisitedViews: (context: { commit: Commit }, view: string) => {
    context.commit(types.ADD_VISITED_VIEWS, view)
  },
  delVisitedViews: (context: { commit: Commit }, view: string) => {
    context.commit(types.DEL_VISITED_VIEWS, view)
  }
}
const app = {
  state: initState,
  mutations: mutations,
  actions: actions
  // state: {
  //   sidebar: {
  //     opened: !Cookies.get('sidebarStatus')
  //   },
  //   theme: 'default',
  //   livenewsChannels: Cookies.get('livenewsChannels') || '[]',
  //   visitedViews: []
  // },
  // mutations: {
  //   TOGGLE_SIDEBAR: (state: AppState) => {
  //     if (state.sidebar.opened) {
  //       Cookies.set('sidebarStatus', '1')
  //     } else {
  //       Cookies.set('sidebarStatus', '0')
  //     }
  //     state.sidebar.opened = !state.sidebar.opened
  //   },
  //   ADD_VISITED_VIEWS: (state: AppState, view: any) => {
  //     if (state.visitedViews.indexOf(view)) return
  //     state.visitedViews.push(view)
  //   },
  //   DEL_VISITED_VIEWS: (state: any, view: any) => {
  //     const index = state.visitedViews.indexOf(view)
  //     state.visitedViews.splice(index, 1)
  //   }
  // },
  // actions: {
  //   ToggleSideBar: (commit: Commit) => {
  //     commit('TOGGLE_SIDEBAR')
  //   },
  //   addVisitedViews: ({ commit }, view) => {
  //     commit('ADD_VISITED_VIEWS', view)
  //   },
  //   delVisitedViews: ({ commit }, view) => {
  //     commit('DEL_VISITED_VIEWS', view)
  //   }
  // }
}

export default app
// export default {
//   state: initState,
//   // getters,
//   actions,
//   mutations
// }
