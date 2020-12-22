// pages/weight/history/component/HistoryCard.js
import {
  getStorage,
  setStorage
} from '../../../../utils/storage';
import {
  showModal
} from '../../../../utils/modal'
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    info: {},
    isDelete: false,
    startX: null,
    marginLeft: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleHistoryDetail() {
      const {
        isDelete,
        info
      } = this.data;
      const url = `/pages/weight/history/detail/historyDetail?id=${info.id}`;

      if (isDelete) {
        this.setData({
          isDelete: false,
          marginLeft: 0
        })
      } else {
        wx.navigateTo({
          url
        })
        this.setData({
          isDelete: false
        })
      }
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
      getStorage('historyData')
        .then(data => {
          this.confirmDelete(data)
        })
    },
    confirmDelete(data) {
      showModal('确定要删除这条历史记录吗？', () => {
        data.map((item, index) => {
          if (item.id == this.data.info.id) {
            data.splice(index, 1);
          }
        })
        setStorage('historyData', data)
          .then(() => {
            this.setData({
              isDelete: false,
              marginLeft: 0
            })
            this.triggerEvent('delete')
          })
      })
    }
  }
})