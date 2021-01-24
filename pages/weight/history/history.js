// pages/weight/history/history.js
import {
  calDegree,
  calAverage
} from '../../../utils/calDuck';
import {
  showModal
} from '../../../utils/modal';
import {
  getStorage,
  setStorage
} from '../../../utils/storage';

import WEIGHT from '../../../utils/urls/weight/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList: [],
    isRestart: null,
    pageNumber: 1,
    pageSize: 6,
    condition: '',
    dataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  handlDataChart() {
    wx.navigateTo({
      url: '/pages/weight/dataTotal/index',
    })
  },
  reloadData() {
    this.onLoad();
  },
  handleRestart() {
    showModal('此操作会清除所有历史数据，是否确认清除？', () => {
      setStorage('historyData', [])
        .then(() => {
          this.onLoad();
          wx.showToast({
            title: '清除成功',
            icon: 'success'
          })
          this.setData({
            isRestart: false
          })
        })
    })
  },
  getWeightList() {
    const userInfo = wx.getStorageSync('userInfo');
    const {
      pageSize,
      pageNumber,
      condition
    } = this.data;

    WEIGHT.GET_WEIGHT_LIST({
        pageSize,
        pageNumber,
        condition,
        uid: userInfo.uid
      })
      .then(res => {
        const {
          dataList
        } = this.data;
        res && this.setData({
          dataList: dataList.concat(res)
        })
      })
  },
  onLoad: function (options) {

    getStorage('historyData')
      .then(data => {
        this.setData({
          isRestart: data.length > 0
        })
        data.forEach(shelf => {
          let arr = []
          shelf.data.map(item => {
            item.barList.map(bar => {
              bar.detail.map(detail => {
                arr.push(detail);
                shelf.degree = calDegree(arr, shelf.unit);
                shelf.average = calAverage(arr, shelf.unit);
                shelf.count = arr.length;
              })
            })
          })
        })
        this.setData({
          historyList: data
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
    this.getWeightList();
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
    this.onLoad();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const {
      pageNumber
    } = this.data;
    this.setData({
      pageNumber: pageNumber + 1
    })
    this.getWeightList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})