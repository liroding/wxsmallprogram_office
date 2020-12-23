// pages/wxml/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: (new Date()).toString(),
    plain: false,
  },

  botton_1: function (e) {
    var mythis = this;
    this.setData({
      plain: !this.data.plain
    })

  },
  botton_2: function (e) {
    this.setData({
      plain: !this.data.plain
    })
  },


  testSubmit:function(e){

    wx.requestSubscribeMessage({
      tmplIds: ['yknmtxHzvfU4rE84aa9si5LuV0gAW_7KGzEXz7FQgN0'], // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
      tmplIds: ['8qZXmYaPl9gJsUFQmhtDb73gvkP-lKFivLyroyTpeyI'],
      success (res) {
        console.log('已授权接收订阅消息')
      }
    })

    wx.request({
      url: 'https://dingyinglai.site/wxapp/wxsubscribes',
      method: "POST",
      data: {
        "authsession": app.globalData.authsession,
        "subscribeid": 1,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // post ,it is different get!!!!
      },
      success: function (res) {
        console.log(res.data)

      }
    })

  },




/**
 
* 弹窗
 
*/
 
showDialogBtn: function () {
 

  this.setData({
   
  showModal: true
   
  })
   
  },
   
  /**
   
  * 弹出框蒙层截断touchmove事件
   
  */
   
  preventTouchMove: function () {
   
  },
   
  /**
   
  * 隐藏模态对话框
   
  */
   
  hideModal: function () {
   
  this.setData({
   
  showModal: false
   
  });
   
  },
   
  /**
   
  * 对话框取消按钮点击事件
   
  */
   
  onCancel: function () {
   
  this.hideModal();
   
  },
   
  /**
   
  * 对话框确认按钮点击事件
   
  */
   
  onConfirm: function () {
   
  wx.showToast({
   
  title: '提交成功',
   
  icon: 'success',
   
  duration: 2000
   
  })
   
  this.hideModal();
   
  },









  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // this.setData({name:'buhao'},null)
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
   //console.log('hide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
   // console.log('unload')
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