// pages/wxml/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */

  data: {
    motto: 'Every Step Is Progress',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    flag: null
  },


  _bt1jumppage: function (e) {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  _bt2jumppage: function (e) {
    wx.navigateTo({
      url: '/pages/userselection/userselection',
    })
  },
 
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('[liro-debug]: <index page> onload')
    if (app.globalData.userInfo) {
      console.log('[liro-debug]: <login page> p1')
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        flag: 1   //add by liro new
      })
      wx.navigateTo({
        url: '/pages/userselection/userselection'
      })
    } else if (this.data.canIUse) {
      console.log('[liro-debug]: <index page> p2')
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          flag:1   //add by liro new
        })
        wx.navigateTo({
         url: '/pages/userselection/userselection'
        })
      }
    } else {
      console.log('[liro-debug]: <index page> p3')
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    } 




  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('[liro-debug]: <index page> onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('[liro-debug]: <index page> onShow')
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