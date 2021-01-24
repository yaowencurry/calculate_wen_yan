// pages/user/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  handleHistory() {
    wx.navigateTo({
      url: '/pages/weight/history/history',
    })
  },
  handleQuitLogin() {
    wx.removeStorage({
      key: 'userInfo',
    })
    wx.navigateTo({
      url: '/pages/user/login/login',
    })
  },
  createUserInfo() {
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userInfo']) {
          console.log(21)
          wx.authorize({
            scope: 'scope.userInfo',
            success(res) {
              console.log(res)
              this.getUserInfo();
            },
            fail(err) {
              console.log(err)
            }
          })
        } else {
          console.log(21)
          this.getUserInfo();
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },
  getUserInfo() {
    wx.getUserInfo({
      withCredentials: true,
      lang: 'zh_CN',
      success: (res) => {
        let userData = wx.getStorageSync('userInfo')
        this.setData({
          userInfo: {
            ...res.userInfo,
            ...userData
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.reLaunch({
        url: '/pages/user/login/login',
      })
    }
    this.createUserInfo();
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