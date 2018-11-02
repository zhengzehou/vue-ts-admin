const Mock = require('mockjs')
const Random = Mock.Random
const produceData = function(opt: any) {
  console.log(opt)
  let articles = []
  for (let i = 0; i < 30; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30),
      auth_name: Random.name(),
      date: Random.date() + ' ' + Random.time(),
      email: Random.email()
    }
    articles.push(newArticleObject)
  }
  return articles
}

const loginbyname = function(opt: any) {
  console.log(opt)
  let newArticleObject = {
    title: Random.csentence(5, 30),
    name: Random.name(),
    date: Random.date() + ' ' + Random.time(),
    email: Random.email(),
    token: Random.name()
  }
  return newArticleObject
}
const logout = function(opt: any) {
  console.log(opt)
  let newArticleObject = {
    title: Random.csentence(5, 30),
    name: Random.name(),
    date: Random.date() + ' ' + Random.time(),
    email: Random.email(),
    token: Random.name()
  }
  return newArticleObject
}

const qrLogin = function(opt: any) {
  return 'http://opc.beta.ule.com/ruralOpcAdmin/login.do'
}

Mock.mock('/user', /post|get/i, produceData)
Mock.mock('/qrLogin', /post|get/i, qrLogin)
Mock.mock('/login/loginbyname', /post|get/i, loginbyname)
Mock.mock('/login/logout', /post|get/i, logout)
