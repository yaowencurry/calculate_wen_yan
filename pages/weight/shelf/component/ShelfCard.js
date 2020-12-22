// pages/weight/shelf/component/ShelfCard.js
import {
  calAverage,
  calDegree
} from '../../../../utils/calDuck';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
      observer: function (newVal) {
        const arr = [];
        newVal.barList.map(item => {
          item.detail.map(ele => {
            arr.push(ele);
          })
        })
        newVal.average = calAverage(arr, newVal.unit);
        newVal.degree = calDegree(arr, newVal.unit);
        newVal.countDuck = arr.length;
        newVal.countBar = newVal.barList.length;

        this.setData({
          info: newVal,
        })
      }
    },
    isDetail: {
      type: String,
      observer: function (newVal) {
        this.setData({
          isDetail: newVal
        })
      }
    },
    dataId: {
      type: String,
      observer: function (newVal) {
        console.log(newVal)
        this.setData({
          dataId: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    info: {},
    isDetail: "",
    startTime: "",
    endTime: "",
    unit: "",
    dataId: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toBarList() {
      if (this.data.endTime - this.data.startTime < 350) {

        if (this.data.isDetail == '1') {
          wx.navigateTo({
            url: `/pages/weight/barlist/index?shelfId=${this.data.info.shelfId}&id=${this.data.dataId}`,
          })
        } else {
          wx.navigateTo({
            url: `/pages/weight/barlist/index?shelfId=${this.data.info.shelfId}`,
          })
        }
      }
    },
    bindTouchStart(e) {
      this.setData({
        startTime: e.timeStamp
      })
    },
    bindTouchEnd(e) {
      this.setData({
        endTime: e.timeStamp
      })
    },
    longTapDelete() {
      wx.vibrateShort();
      wx.showModal({
        title: '提示',
        content: '此操作会重置所选中棚的已录入数据，是否确认操作？',
        success: (res) => {
          if (res.confirm) {
            this.triggerEvent('clearShelf', {
              shelfId: this.data.info.shelfId
            })
          }
        }
      })
    }
  }
})