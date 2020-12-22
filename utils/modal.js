export function showModal(content, confirm, cancel, title = "提示", cancelText = '取消', confirmText = '确定') {
  wx.showModal({
    cancelText,
    confirmText,
    content,
    showCancel: true,
    title,
    success: (res) => {
      if(res.confirm) {
        confirm()
      }
    },
    fail: (res) => {},
    complete: (res) => {},
  })
}