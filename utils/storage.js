export function getStorage(key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: key,
      success: (res) => {
        const data = JSON.parse(res.data);
        resolve(data);
      },
      fail: () => {
        resolve()
      },
      complete: () => {
        reject(`get key:${key} data fail`)
      }
    })
  })
}

export function setStorage(key, data) {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      data: JSON.stringify(data),
      key: key,
      success: () => {
        resolve('ok')
      },
      fail: () => {
        reject('error fail')
      }
    })
  })
}

export function setStorageSync(key, data) {
  wx.setStorageSync(key, data)
}