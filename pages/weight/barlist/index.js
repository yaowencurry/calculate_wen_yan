// pages/weight/barlist/index.js
import {
  getStorage,
  setStorage
} from '../../../utils/storage';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    shelfId: '',
    number: ''
  },
  handleDetail() {
    wx.navigateTo({
      url: `/pages/weight/detail/detail?shelfId=${this.data.shelfId}&barNumber=${this.data.list.length+1}&shelfNumber=${this.data.number}`,
    })
  },
  backToList() {
    wx.switchTab({
      url: '../shelf/index',
    })
  },
  deleteBarItem(e) {
    getStorage('shelfList')
      .then(data => {
        data.forEach(item => {
          if (this.data.shelfId == item.shelfId) {
            item.barList.forEach((ele, index) => {
              if (ele.barId == e.detail.barId) {
                item.barList.splice(index, 1);
              }
            })
          }
        })
        setStorage('shelfList', data)
          .then(res => {
            res && this.onLoad({
              shelfId: this.data.shelfId
            })
          })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      shelfId
    } = options;
    this.setData({
      shelfId
    })
    getStorage('shelfList')
      .then(data => {
        data.map(item => {
          if (item.shelfId === shelfId) {
            this.setData({
              list: item.barList,
              number: item.number
            })
          }
        })
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