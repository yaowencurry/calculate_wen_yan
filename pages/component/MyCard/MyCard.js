// pages/component/MyCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    data: '123',
    count: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      let number = this.data.count;
      number++
      this.setData({
        count: number
      })
      let myEventDetail = {
        count: this.data.count
      };
      this.triggerEvent('myevent', myEventDetail);
    }
  },
  pageLifetimes: {
    show() {
      console.log(1)
    },
    hide() {
      console.log(2)
    }
  }
})