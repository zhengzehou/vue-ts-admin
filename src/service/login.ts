import fetch from '../utils/fetch'
import '../mock/mock'

export function loginByUsername(username: string, password: string) {
  const data = { username: username, password: password }
  return fetch({
    url: 'http://beta11.ule.com:9001/auth-service/jwt/token',
    method: 'post',
    params: data
  })
}

export function loadPermission() {
  return fetch({
    url: 'http://beta11.ule.com:9001/auth-service/users/menus',
    method: 'post',
    params: {}
  })
}

export function clearCookieToken() {
  var userName = encodeURI('userName')
  var key: any = localStorage.getItem(userName)
  localStorage.setItem(userName, '')
  localStorage.setItem(key, '')
}
export function setCookieToken(userName: string, token: string) {
  userName = compileStr(userName)
  token = compileStr(token)
  localStorage.setItem(encodeURI('userName'), userName)
  localStorage.setItem(userName, token)
}
export function getCookieToken() {
  var userName = encodeURI('userName')
  var key: any = localStorage.getItem(userName)
  let tokenStr: any = localStorage.getItem(key)
  return tokenStr ? uncompileStr(tokenStr) : ''
}
export function getCookieUserName() {
  var userName = encodeURI('userName')
  var key: any = localStorage.getItem(userName)
  return key
}
function compileStr(code: string) {
  //对字符串进行加密
  var c = String.fromCharCode(code.charCodeAt(0) + code.length)
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
  }
  return escape(c)
}
//字符串进行解密
function uncompileStr(code: string) {
  code = unescape(code)
  var c = String.fromCharCode(code.charCodeAt(0) - code.length)
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1))
  }
  return c
}
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

export function logout(username: string) {
  return fetch({
    url: '/login/logout',
    method: 'post',
    data: { username }
  })
}

export function getUserPermissionInfo(token: string) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
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
