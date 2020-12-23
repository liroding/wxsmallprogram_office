// pages/feedbackpage/patientcase/patientcase.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      info: options.info,
    })
    wx.showModal({
      title: '提示',
      content: options.info + '\r\n第三项：【确认审核意见】',
      showCancel: false,
      confirmText: '回首页',
      success: function (res) {
             if (res.confirm) {
                console.log('[liro-debug]: 服务器返回') 
                wx.reLaunch({
                  url: '/pages/patient/patient_homepage/patient_homepage',
                  success: function (res) {
                    // 通过eventChannel向被打开页面传送数据
                    console.log('[liro-debug]: navigate to feedback page')
                  }
                })

            }
          }
      })
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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  }
})