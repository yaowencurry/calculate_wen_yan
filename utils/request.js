const BASE_URL = 'http://localhost:6300'


function get(url, data) {
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method: 'get',
      data: data,
      success: (res) => {
        if (res.data.code == 500) {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
          reject(res.data)
          wx.hideLoading()
        } else {
          resolve(res.data);
          wx.hideLoading()
        }
      },
      fail: (err) => {
        reject(err);
        wx.hideLoading()
      }
    })
  })
}

function post(url, data) {
  console.log(url)
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method: 'post',
      data,
      success: (res) => {
        if (res.data.code == 500) {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
          reject(res.data)
          wx.hideLoading()
        } else {
          resolve(res.data);
          wx.hideLoading()
        }
      },
      fail: (err) => {
        reject(err);
        wx.hideLoading()
      }
    })
  })
}

export default {
  get,
  post
}