const axios = require('axios')
const qs = require('qs')
const ResultError = require('../model/result-error')

const baseURL = '/'
const instance = axios.create({
  baseURL,
  timeout: 30 * 1000
})

/**
 * http(s)请求
 * @param url 请求地址
 * @param data 请求参数 / 提交数据
 * @param ops 附加参数 {method = 'GET', type = 'formData', cache = false, ...}
 * @returns {Promise}
 */
const fetch = (url = '/', data = {}, ops = {}) => {
  // 方法
  const method = (ops.method || 'GET').toUpperCase()
  delete ops.method
  // 提交参数类型
  const type = ops.type === 'json' ? 'json' : 'formData'
  delete ops.type
  // GET请求是否缓存
  const cache = ops.cache === true
  delete ops.cache
  // axios参数
  let options = {
    url,
    method: method
  }

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  if (['PUT', 'POST', 'PATCH'].includes(method)) {
    options.data = data
    if (type === 'formData') {
      Object.assign(options, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: data => qs.stringify(data, {arrayFormat: ops.arrayFormat || 'repeat'})
      })
    }
  } else {
    // 请求是否使用缓存，默认不缓存，请求参数增加时间戳
    if (cache === false) {
      Object.assign(data, {_: new Date().getTime()})
    }
    options.params = data
    options.paramsSerializer = function(params) {
      return qs.stringify(params, {arrayFormat: ops.arrayFormat || 'repeat'})
    }
  }

  delete ops.arrayFormat

  Object.assign(options, ops)

  return new Promise((resolve, reject) => {
    instance(options).then(response => {
      if (response.status === 200) {
        resolve(response.data)
      } else {
        reject(response.statusText)
      }
    }).catch(e => {
      let status = e && e.response && e.response.status
      let error
      switch (status) {
        case 400:
          error = new ResultError('请求参数有误，无法被服务器理解', status)
          break
        case 403:
          error = new ResultError('无权限，服务器拒绝您的请求', status)
          break
        case 404:
          error = new ResultError('请求路径不存在', status)
          break
        case 405:
          error = new ResultError('请求方法错误', status)
          break
        case 500:
          error = new ResultError('系统错误，请稍后重试', status)
          break
        case 504:
          error = new ResultError('请求超时', status)
          break
        default:
          error = new ResultError(e.message, status)
          break
      }
      reject(error || e)
    })
  })
}

const $http = {
  /**
   * request请求
   * @param url 地址
   * @param data 参数
   * @param ops 附加属性
   * @returns {Promise}
   */
  request: (url = '', data = {}, ops = {}) => fetch(url, data, ops),
  /**
   * get请求
   * @param url 地址
   * @param data 参数
   * @param ops 附加属性
   * @returns {Promise}
   */
  get: (url = '', data = {}, ops = {}) => fetch(url, data, {...ops, method: 'GET'}),
  /**
   * delete请求
   * @param url 地址
   * @param data 参数
   * @param ops 附加属性
   * @returns {Promise}
   */
  delete: (url = '', data = {}, ops = {}) => fetch(url, data, {...ops, method: 'DELETE'}),
  /**
   * post请求
   * @param url 地址
   * @param data 参数
   * @param ops 附加属性
   * @returns {Promise}
   */
  post: (url = '', data = {}, ops = {}) => fetch(url, data, {...ops, method: 'POST'}),
  /**
   * XmlRequest 以json格式传参post请求
   * @param url 地址
   * @param data 参数
   * @param ops 附加属性
   * @returns {Promise}
   */
  postJson: (url = '', data = {}, ops = {}) => fetch(url, data, {...ops, method: 'POST', type: 'json'}),
  /**
   * XmlRequest put请求
   * @param url 地址
   * @param data 参数
   * @param ops 附加属性
   * @returns {Promise}
   */
  put: (url = '', data = {}, ops = {}) => fetch(url, data, {...ops, method: 'PUT'}),
  /**
   * XmlRequest 以json格式传参put请求
   * @param url 地址
   * @param data 参数
   * @param ops 附加属性
   * @returns {Promise}
   */
  putJson: (url = '', data = {}, ops = {}) => fetch(url, data, {...ops, method: 'PUT', type: 'json'}),
  /**
   * XmlRequest patch请求
   * @param url 地址
   * @param data 参数
   * @param ops 附加属性
   * @returns {Promise}
   */
  patch: (url = '', data = {}, ops = {}) => fetch(url, data, {...ops, method: 'PATCH'}),
  /**
   * XmlRequest 以json格式传参patch请求
   * @param url 地址
   * @param data 参数
   * @param ops 附加属性
   * @returns {Promise}
   */
  patchJson: (url = '', data = {}, ops = {}) => fetch(url, data, {...ops, method: 'PATCH', type: 'json'}),
  /**
   * node环境下jsonp请求
   * @param url
   * @param data
   * @param ops
   * @returns {Promise}
   */
  jsonp: (url = '', data = {}, ops = {}) => {
    const callback = ops.callback || 'callback'
    return fetch(url, Object.assign(data, {
      [callback]: 'callback'
    }), {...ops, method: 'GET', responseType: 'text'}).then(text => {
      try {
        // 剔除掉返回的字符串前后的空格、括号以及回调函数名
        const str = text.replace(/^\s*callback\(/, '').replace(/\);*\s*$/, '')
        return JSON.parse(str)
      } catch (e) {
        throw e
      }
    })
  },
  instance,
  defaults: instance.defaults,
  interceptors: instance.interceptors
}

module.exports = $http
