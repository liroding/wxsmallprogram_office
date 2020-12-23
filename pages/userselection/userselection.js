// pages/index_bakcup/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},

    background: ['/resources/office_pic/head_1.jpg', '/resources/office_pic/head_2.jpg', '/resources/office_pic/head_3.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0

  },



  download_message: function () {
    if (app.globalData.userInfo.nickName == 'ding-丁'){
      console.log(app.globalData.userInfo.nickName)
      wx.navigateTo({
        url: '../download/download'
      })
    }else{
      console.log('[liro-debug]:no access rights !!!')

      wx.showModal({
        title: '提示',
        content: '您没有权限访问此功能',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            console.log('[liro-debug]:用户点击确定')
          } else {//这里是点击了取消以后
            console.log('[liro-debug]:用户点击取消')
          }
        }
      })

    }
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var authsession = wx.getStorageSync('authsession')

  if(authsession.length == 0){

    wx.showToast({
      title: '小程序过期，请删除之后，再扫描进入\r\n' ,
      icon: 'none',
      duration: 5000//持续的时间
    })
    //authsession 过期，退回最始页面位置

    wx.showModal({
      title: '登陆提示',
      content: '未授权，点击确认按钮，返回注册',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          console.log('[liro-debug]:确认授权') 
          wx.navigateTo({
            url: '/pages/index/index'
          })

        } else {//这里是点击了取消以后
          console.log('[liro-debug]:不授权')
        }
      }
    })


    
  }
   
  

  app.globalData.authsession = authsession

  this.setData({
      userInfo: app.globalData.userInfo,
    })
  console.log("[liro-debug]:userselection page onload")
  console.log("[liro-debug]:userselection page app.globalData.authsession =" + app.globalData.authsession)


  },
  getUserInfo: function (e) {
       console.log(e) 
      // 可以将 res 发送给后台解码出 unionId
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('[liro-debug]:userselection page onready')
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("[liro-debug]:userselection page onshow")
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