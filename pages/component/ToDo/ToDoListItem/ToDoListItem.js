// pages/component/ToDo/ToDoListItem/ToDoListItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isChecked: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkboxChange(e) {
      console.log(e)
      let isChecked;
      if (e.detail.value[0] === 'false') {
        wx.showToast({
          title: '干的漂亮！',
        })
        isChecked = true;
      } else {
        isChecked = false;
      }
      this.triggerEvent('change', {
        isChecked: isChecked,
        content: this.properties.info.content
      });
    },
    handlDelete() {
      wx.showModal({
        title: '看好了',
        content: '真的不做了吗？',
        success:(res)=> {
          if (res.confirm) {
            this.handleConfirm();
            console.log('用户点击确定');
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    handleConfirm() {
      this.triggerEvent('delete', {
        content: this.properties.info.content
      });
    }
  }
})