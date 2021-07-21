import Fly from '../lib/wx'
let http=new Fly

//基础路径
http.config.baseURL ='https://api.zhuishushenqi.com/'
//请求拦截
//每次发请求的时候都会触发
http.interceptors.request.use(config => {
  wx.showLoading({
    title: '加载中...'
  })
  return config
}, err => {
  wx.hideLoading()
  return Promise.reject(err)
})

//响应拦截
//每一次请求有结果的时候会触发
http.interceptors.response.use(res => {
  wx.hideLoading()
  return res.data
}, err => {
  wx.hideLoading()
  //每次请求失败的状态码
  let status = err.response & err.s.status
  switch (status) {
    case 400:
      wx.showToast({
        title: '参数错误',
        icon:'error'
      })
      break;
    case 401:
      wx.showToast({
        title: '登录过期',
        icon:'error'
      })
      break
    case 403:
      wx.showToast({
        title: '没有权限',
        icon:'error'
      })
      break
    case 404:
      wx.showToast({
        title: '路径错误',
        icon:'error'
      })
      break
    case 500:
      wx.showToast({
        title: '服务器错误',
        icon:'error'
      })
      break
    case 503:
      wx.showToast({
        title: '服务器维护',
        icon:'error'
      })
      break;
  }
  //一秒钟之后让提示框消失
  setTimeout(() => {
    wx.hideToast()
  }, 1000);
  return Promise.reject(err)
})

export default http