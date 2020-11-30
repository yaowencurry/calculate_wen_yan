// pages/weight/detail/detail.js
import {
  calAverage,
  calDegree
} from '../../../utils/calDuck';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: '0',
    list: [],
    barId: null,
    shelfId: null,
    shelfNumber: '',
    barNumber: '',
    isSave: false,
    unit: null
  },
  handleNumber(data) {
    let number = data.detail.number;
    if (number === '.' && this.data.number.indexOf('.') >= 0) {
      return
    }
    if (this.data.number === '0') {
      if (number === '.') {
        this.setData({
          number: this.data.number + number,
        })
      } else {
        this.setData({
          number,
        })
      }
    } else {
      this.setData({
        number: this.data.number + number
      })
    }
  },
  handleComfirm(data) {
    const type = data.detail.type;
    if (type === '1') {
      this.setData({
        number: '0'
      })
    } else if (type === '2') {
      if (this.data.number === '0') return
      this.setData({
        number: this.data.number.slice(0, -1)
      })
    } else {
      const {
        number
      } = this.data;
      if (!number || number === '0') {
        return wx.showToast({
          title: '请输入具体重量',
          icon: 'none'
        });
      }
      this.pushListData(this.data.number);
      this.setData({
        number: '0'
      })
    }
  },
  pushListData(data) {
    if (data.indexOf('.') === data.length - 1) {
      data = data.slice(0, -1);
    }
    let arr = this.data.list;

    arr.unshift({
      id: arr.length,
      count: data
    });
    this.setData({
      list: arr
    })
  },
  handleDelete(e) {
    const index = e.target.dataset.index;
    let arr = this.data.list;
    wx.showModal({
      title: '温馨提示',
      content: '确定要删除此数据吗？',
      success: (res) => {
        if (res.confirm) {
          arr.splice(index, 1);
          this.setData({
            list: arr
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  backBarList() {
    wx.getStorage({
      key: 'shelfList',
      success: (res) => {
        let data = JSON.parse(res.data);
        let average = calAverage(this.data.list);
        let degree = calDegree(this.data.list);
        let date = new Date();
        let myDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        if (this.data.barId) {
          data.map(item => {
            if (item.shelfId === this.data.shelfId) {
              item.date = myDate;
              item.barList.splice(Number(this.data.barId), 1, {
                barId: this.data.barId,
                degree,
                average,
                detail: this.data.list
              })
            }
          })
        } else {
          data.map(item => {
            if (item.shelfId === this.data.shelfId) {
              item.date = myDate;
              item.barList.push({
                barId: item.barList.length,
                degree,
                average,
                detail: this.data.list
              })
            }
          })
        }
        this.setData({
          isSave: true
        })
        wx.setStorage({
          data: JSON.stringify(data),
          key: 'shelfList',
        })
        wx.reLaunch({
          url: '/pages/weight/barlist/index?shelfId=' + this.data.shelfId,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      shelfId,
      barId,
      barNumber,
      shelfNumber
    } = options;
    this.setData({
      shelfId,
      barId,
      barNumber,
      shelfNumber,
      unit: JSON.parse(wx.getStorageSync('unit'))
    })


    if (barId) {
      wx.getStorage({
        key: 'shelfList',
        success: (res) => {
          const data = JSON.parse(res.data);
          const index = Number(barId);
          data.map(item => {
            if (item.shelfId == shelfId) {
              this.setData({
                list: item.barList[index].detail,
                shelfNumber: item.number
              })
            }
          })
        }
      })
    }
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
    // this.backBarList();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // wx.showModal({
    //   title: 'cancelColor',
    // })
    if (!this.data.isSave && this.data.list.length > 0) {
      this.backBarList();
    }
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

  },
})