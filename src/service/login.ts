import fetch from '../utils/fetch'
import '../mock/mock'

export function loginByEmail(email: string, password: string) {
  const data = {
    email,
    password
  }
  return fetch({
    url: '/login/loginbyemail',
    method: 'post',
    data
  })
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  })
}

export function getInfo(token: string) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function testHeaders() {
  // fetch.defaults.headers.common['Content-Type'] =
  //   'application/json;charse=UTF-8'
  // return fetch({
  //   url: 'http://192.168.116.148:9080/dataexportmgr/config/testHeader',
  //   method: 'post',
  //   params: { userId: 1, userName: 'zhangsan' },
  //   headers: {
  //     tokes: 'sdfdd'
  //   }
  // })
  return fetch({ url: '/user', method: 'get' })
}

export function qrLogin() {
  return fetch({ url: '/qrLogin', method: 'get' })
}
