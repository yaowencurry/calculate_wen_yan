// pages/user/login/login.js

import LOGINAPI from '../../../utils/urls/user/api'

import {
  setStorageSync
} from '../../../utils/storage'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  usernameInput(e) {
    this.setData({
      username: e.detail.value
    })
  },
  passwordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },
  handleLogin() {
    const {
      username,
      password
    } = this.data;
    if (!username) {
      return wx.showToast({
        title: '用户名或手机号空',
        icon: 'none'
      })
    }
    if (!password) {
      return wx.showToast({
        title: '密码为空',
        icon: 'none'
      })
    }
    LOGINAPI.LOGIN({
      username,
      password
    }).then(res => {
      if (res) {
        setStorageSync('userInfo', res);
        wx.showToast({
          title: '登录成功',
        })
        wx.switchTab({
          url: '/pages/user/mine/mine',
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})