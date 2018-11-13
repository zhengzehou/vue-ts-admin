import axios from 'axios'
import { dateUtils } from '@/utils/DateUtils'
import { getCookieToken } from '@/service/login'
// import Vue from 'vue'
// import router from '../router';

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    config.headers.common['Authorization'] = getCookieToken() //this.$store.state.user.token
    // config.headers.common['ContentType'] = 'application/json;charset=UTF-8'
    config.headers.post['Content-Type'] = 'application/json; charset=UTF-8'
    config.headers.common['timestamp'] = new Date().getTime()
    config.headers.common['nonce'] = dateUtils.uuid(32, 16)
    // config.headers.common['SelfCookie'] = document.cookie
    // console.log('SelfCookie=' + document.cookie)
    // config.headers.common['TOKEN'] = 'testToken'
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error) // for debug
    // vue.$Message.error({
    //                 message: error.message,
    //                 duration: 5 * 1000,
    //                 closable: true
    //             });
    return Promise.reject(error)
  }
)

export default service
