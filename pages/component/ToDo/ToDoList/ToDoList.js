// pages/component/ToDo/TodoList/ToDoList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      observer: function (newVal) {
        const noList = newVal.filter(item => !item.isChecked);
        const yesList = newVal.filter(item => item.isChecked);
        this.setData({
          noList,
          yesList
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    noList: [],
    yesList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange(data) {
      this.triggerEvent('change', {
        ...data.detail
      })
    },
    handleDelete(data) {
      this.triggerEvent('delete', {
        content: data.detail.content
      })
    }
  }
})