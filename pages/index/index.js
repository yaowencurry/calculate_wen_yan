//index.js
//获取应用实例
const app = getApp()

import {
  calcExpression
} from '../../utils/calculate';
import {
  COMMON
} from '../../utils/urls/common/urls'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    handleList: ['AC', '÷', 'x', '-', '7', '8', '9', '+', '4', '5', '6', '←', '1', '2', '3', '+/-', '00', '0', '00', '='],
    result: '0',
    isResult: false
  },
  //事件处理函数
  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    wx.request({
      url: COMMON.TODAY_WEATHER,
      method: 'get',
      data: {
        appid: '41949958',
        appsecret: 'snu44pIY',
        version: 'v9'
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res);
      }
    })
    wx.login({
      timeout: 0,
      success: (res) => {
        console.log(res)
      }
    })
  },
  handleCalculate(data) {
    const result = calcExpression(data);
    if (!isNaN(result)) {
      this.setData({
        result: String(result),
        isResult: true
      })
    } else {
      wx.showToast({
        title: '对不起，我算不出来',
        icon: 'none'
      })
      this.setData({
        result: '0',
        isResult: true
      })
    }
  },
  handleData(data) {
    const oldData = this.data.result;

    this.setData({
      result: oldData + data,
      isResult: false
    })
  },
  handleBack() {
    if (this.data.result.length > 0) {
      this.setData({
        result: this.data.result.substr(0, this.data.result.length - 1)
      })
      if (this.data.result.length < 1) {
        this.setData({
          result: '0'
        })
      }
    } else {
      this.setData({
        result: '0'
      })
    }
  },
  handleTap(e) {
    const data = e.target.dataset.count;
    const {
      result,
      isResult
    } = this.data;
    wx.vibrateShort({
      success() {
        console.log(123);
      }
    })
    if (data === '+/-') {
      this.handleBackCount();
      return;
    }
    if (result === '0' && ['÷', '-', '+', 'x'].includes(data)) {
      return
    }
    if (data === '←') {
      this.handleBack();
      return
    }
    if (result != '0' && ['÷', '-', '+', 'x'].includes(data)) {
      this.handleData(data);
      return;
    }
    if (data === 'AC') {
      this.setData({
        result: '0'
      })
      return;
    }
    if (data === '=') {
      this.handleCalculate(result);
      return;
    }
    if (result === '0' || isResult) {
      this.setData({
        result: data,
        isResult: false
      })
    } else {
      this.handleData(data);
    }
    if (this.data.result === '5201314') {
      wx.showModal({
        title: 'hi，LZY',
        content: '我喜欢你，你知道吗？',
        success: (res) => {
          if (res.confirm) {
            wx.showModal({
              title: '知道了啊',
              content: '那我们在一起吧',
              success: (res) => {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '/pages/love/love',
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  handleBackCount() {
    if (this.data.result > 0) {
      this.setData({
        result: '-' + this.data.result
      })
    } else {
      this.setData({
        result: this.data.result * -1
      })
    }
  }
})