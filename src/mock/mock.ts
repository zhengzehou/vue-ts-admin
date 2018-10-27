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

Mock.mock('/user', /post|get/i, produceData)
