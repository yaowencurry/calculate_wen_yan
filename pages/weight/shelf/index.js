// pages/weight/shelf/index.js
import {
  setStorage,
  getStorage
} from '../../../utils/storage';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: ['克(g)', '千克(kg)'],
    index: null,
    rangeData: ['0', '1'],
    list: [],
    defaultList: [{
      shelfId: '001',
      number: '4',
      average: null,
      degree: null,
      barList: []
    }, {
      shelfId: '002',
      number: '5',
      average: null,
      degree: null,
      barList: []
    }, {
      shelfId: '003',
      number: '6',
      average: null,
      degree: null,
      barList: []
    }, {
      shelfId: '004',
      number: '7',
      average: null,
      degree: null,
      barList: []
    }]
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    setStorage('unit', e.detail.value)
  },
  handleRestart() {
    wx.showModal({
      title: '提示',
      content: '此操作会清除当前所输入数据，不会将数据保存至历史，是否确认操作？',
      success: (res) => {
        if (res.confirm) {
          wx.setStorage({
            key: "shelfList",
            data: JSON.stringify(this.data.defaultList)
          })
          this.onLoad();
        } else {
          console.log(123)
        }
      },
    })
  },
  handleSave() {
    wx.showModal({
      title: '提示',
      content: '当前录入数据会保存至历史页面，并初始化数据，是否确认操作？',
      success: (res) => {
        if (res.confirm) {
          this.saveHistoryData();
        } else {
          console.log(123)
        }
      },
      fail: () => {
        console.log(123);
      }
    })
  },
  saveHistoryData() {
    const date = new Date();
    const myDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    wx.getStorage({
      key: 'historyData',
      success: (res) => {
        let data = JSON.parse(res.data);
        data.push({
          data: this.data.list,
          date: myDate,
          id: data.length,
          unit: String(this.data.index)
        });
        this.saveStorage(data);
      },
      fail: () => {
        let arr = [];
        let obj = {
          data: this.data.list,
          date: myDate,
          id: 0,
          unit: String(this.data.index)
        }
        arr.push(obj);
        this.saveStorage(arr)
      }
    })
  },
  saveStorage(data) {
    setStorage('historyData', data)
      .then(() => {
        wx.showToast({
          title: '添加成功',
        })

      }).then(() => {
        setStorage('shelfList', this.data.defaultList)
      }).then(() => {
        this.onLoad();
      })
  },
  deleteShelfData(data) {
    const {
      shelfId
    } = data.detail;
    getStorage('shelfList')
      .then(list => {
        list.forEach(item => {
          if (item.shelfId == shelfId) {
            item.barList = [];
          }
        })
        return list
      }).then((list) => {
        setStorage('shelfList', list)
      }).then(() => {
        wx.showToast({
          title: '删除成功',
        })
        this.onLoad();
      })

  },
  clearHistory() {
    getStorage('isClearHistory').then((res) => {
      if (res !== '1') {
        setStorage('isClearHistory', '1')
          .then(() => {
            wx.showModal({
              title: '提示',
              content: '由于版本升级需要清除原有历史数据，请确认操作',
              showCancel: false,
              success: (res) => {
                if (res.confirm) {
                  setStorage('historyData', [])
                    .then(() => {
                      this.onLoad();
                    })
                }
              }
            })
          })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.clearHistory();
    wx.getStorage({
      key: 'unit',
      success: (res) => {
        this.setData({
          index: Number(JSON.parse(res.data))
        })
      },
      fail: () => {
        this.setData({
          index: 0
        })
        setStorage('unit', '0')
      }
    })
    // getStorage('unit').then(res => {
    //   if (res === '0') {
    //     this.setData({
    //       index: res
    //     })
    //   } else {
    //     this.setData({
    //       index: 0
    //     })
    //   }
    // })
    wx.getStorage({
      key: 'shelfList',
      success: (res) => {
        if (res) {
          this.setData({
            list: JSON.parse(res.data)
          })
        } else {
          this.setData({
            list: this.data.defaultList
          });
          wx.setStorage({
            key: "shelfList",
            data: JSON.stringify(this.data.defaultList)
          })
        }
      },
      fail: () => {
        this.setData({
          list: this.data.defaultList
        });
        wx.setStorage({
          key: "shelfList",
          data: JSON.stringify(this.data.defaultList)
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