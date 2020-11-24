import axios from 'axios'
import qs from 'qs'

const CODE_OK = 200
const CODE_NO_LOGIN = 10031 //请跳转授权登录页面

axios.defaults.withCredentials = true; //让ajax携带cookie

// http response 服务器响应拦截器，这里拦截错误，并重新跳入登录页
axios.interceptors.response.use(
  res => {
    const { data: { code } } = res
    if (code === CODE_NO_LOGIN) {
      // location.href = authorizationPath
    }
    return res
  },
  err => Promise.reject(err)
)

/**
 * @desc get请求
 * @param {String} url 请求地址
 * @param {Object} params [请求时携带的参数]
 */
export const $get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params }).then(res => {
      const {
        code
      } = res.data

      if (code === CODE_OK) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    })
  })
}

/**
 * @desc post请求
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 */
export const $post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params))
      .then(res => {
        const {
          code
        } = res.data

        if (code === CODE_OK) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      })
  })
}