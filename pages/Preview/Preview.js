// pages/Preview/Preview.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    name:null,
    sex:null,
    age:null,
    department:null,
    telephone:null,
    authsession:null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      var mythis = this
      console.log('previed onload')
      this.setData({
         userInfo: app.globalData.userInfo,
         authsession: app.globalData.authsession
      })

      wx.showLoading({
        title: '获取数据中',
      })

      //请求数据库，获取所有提交的信息
      wx.request({
        url: 'https://dingyinglai.site/wxapp/querymysqldb',
         method: "POST",
         data: {
            "reqid": 3,    //get all submit information  id=3
            "authsession": app.globalData.authsession,
         },
         header: {
           'content-type': 'application/x-www-form-urlencoded' // post ,it is different get!!!!
         },
         success: function (res) {
             console.log(res.data)
             wx.hideLoading()
             mythis.setData({
                 name: res.data.name,
                 sex: res.data.sex,
                 age: res.data.age,
                 department: res.data.department,
                 telephone: res.data.telephone

          })
        /*
        wx.navigateTo({
          url: '../feedbackpage/idmesg/idmesg?info=' + res.data,
          success: function (res) {
            // 通过eventChannel向被打开页面传送数据
            console.log('navigate to feedback page')
          }
        })
        */
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