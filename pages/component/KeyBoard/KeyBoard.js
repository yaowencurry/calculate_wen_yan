// pages/component/keyboard/KeyBoard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    numberList: [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', ''
    ],
    handleList: [{
        type: '1',
        text: '清除'
      },
      {
        type: '2',
        text: '←'
      },
      {
        type: '3',
        text: '确认'
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleNumberTap(e) {
      wx.vibrateShort();
      const number = e.target.dataset.count;
      this.triggerEvent('number', {
        number
      });
    },
    handleComfirmTap(e) {
      wx.vibrateShort();
      const type = e.target.dataset.count;
      this.triggerEvent('confirm', {
        type
      });
    }
  }
})