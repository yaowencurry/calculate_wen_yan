// pages/weight/barlist/component/BarItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
      observer: function (newVal) {
        this.setData({
          info: newVal
        })
      }
    },
    index: {
      type: Number,
      observer: function (newVal) {
        this.setData({
          index: newVal
        })
      }
    },
    shelfId: {
      type: String,
      observer: function (newVal) {
        this.setData({
          shelfId: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    info: {},
    index: null,
    isDelete: false,
    shelfId: null,
    marginLeft: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toBarDetail() {
      if (this.data.isDelete) {
        this.setData({
          isDelete: false,
          marginLeft: 0
        })
        return
      }
      wx.navigateTo({
        url: `/pages/weight/detail/detail?shelfId=${this.data.shelfId}&barId=${this.data.info.barId}&barNumber=${this.data.index+1}`,
      })
      this.setData({
        isDelete: false
      })
    },
    handleTouchMove(e) {
      const startX = this.data.startX;
      if (e.touches[0].clientX - startX < -50) {
        wx.vibrateShort();
        this.setData({
          isDelete: true,
          marginLeft: -90 + 'rpx'
        })
      } else {
        if (this.data.isDelete) {
          this.setData({
            isDelete: false,
            marginLeft: 0
          })
        }
      }
    },
    handleTouchStart(e) {
      this.setData({
        startX: e.touches[0].clientX
      })
    },
    handleDelete() {
      wx.showModal({
        title: '提示',
        content: '确定要删除这栏的录入数据吗？',
        success: (res) => {
          if (res.confirm) {
            this.triggerEvent('delete', {
              barId: this.data.info.barId
            })
            this.setData({
              isDelete: false,
              marginLeft: 0
            })
          }
        }
      })
    },
  }
})