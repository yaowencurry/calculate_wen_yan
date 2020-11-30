// pages/weight/history/detail/historyDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    unit: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      id
    } = options;
    wx.getStorage({
      key: 'historyData',
      success: (res) => {
        const data = JSON.parse(res.data);
        data.map(item => {
          if (item.id == id) {
            item.data.map(ele => {
              ele.unit = item.unit
            })
            this.setData({
              list: item.data,
            })
          }
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
  onPullDownRefresh: function () {},

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