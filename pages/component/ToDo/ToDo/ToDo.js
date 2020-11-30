// pages/component/ToDo/Todo/ToDo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  lifetimes: {
    attached() {
      let list = [];
      wx.getStorage({
        key: 'todoList',
        success: (res) => {
          if (res) {
            list = JSON.parse(res.data);
          }
          this.setData({
            list: list
          })
        }
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    value: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange(data) {
      let {
        isChecked,
        content
      } = data.detail;
      let newList = this.data.list;
      newList.map(item => {
        if (item.content === content) {
          if (isChecked) {
            item.isChecked = true;
          } else {
            item.isChecked = false;
          }
        }
      })
      this.setData({
        list: newList
      })
      wx.setStorage({
        key: "todoList",
        data: JSON.stringify(this.data.list)
      })
    },
    bindKeyInput(e) {},
    handleAdd() {
      const value = this.data.value;

      if (!value) {
        wx.showToast({
          title: '请填写待办事项内容',
          icon: "none"
        })
        return;
      }
      const list = this.data.list;

      this.setData({
        list: [...list, {
          content: value,
          isChecked: false
        }],
        value: ''
      })
      wx.setStorage({
        key: "todoList",
        data: JSON.stringify(this.data.list)
      })
    },
    handeDelete(data) {
      const list = this.data.list.filter(item => item.content !== data.detail.content);
      this.setData({
        list
      })
      wx.setStorage({
        key: "todoList",
        data: JSON.stringify(this.data.list)
      })
    }
  }
})