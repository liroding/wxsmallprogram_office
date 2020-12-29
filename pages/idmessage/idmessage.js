// pages/idmessage/idmessage.js
const app = getApp()



Page({

  /**
   * 页面的初始数据
   */
  data: {
    authsession:null,
    reqid:null,

    //idmessage
    name: null,
    sex: null,
    _sex:null,
    age: null,
    department: null,
    telephone : null,
 
  },

  formSubmit: function (e) {
    console.log('[liro-debug]:form ',  e.detail.value)
    var form = e.detail.value
    for(var item in form){
      if(!form[item]){
        wx.showToast({
          title: '请将信息填写完整',
          icon: 'none',
          duration: 1500
        })
        return;
      }
    }

    console.log('[liro-debug]:form发生了submit事件，携带数据为：', e.detail.value)
    wx.showModal({
      title: '提示',
      content: '再确认是否提交',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          console.log('[liro-debug]:确认提交')
          console.log('[liro-debug]:authsession=' + app.globalData.authsession)

          wx.showLoading({
            title: '提交中',
          })

          wx.request({
            url: 'https://dingyinglai.site/wxapp/usermesgsubmit',
            method: "POST",
            data: {
              "name": e.detail.value.user,
              "checkbox": e.detail.value.checkbox,
              "age": e.detail.value.age,
              "department": e.detail.value.department,
              "telephone": e.detail.value.telephone,
              "authsession": app.globalData.authsession,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // post ,it is different get!!!!
            },
            success: function (res) {
              console.log(res.data)
              wx.hideLoading()

              wx.redirectTo({
                url: '/pages/feedbackpage/idmesg/idmesg?info=' + res.data,
                success: function (res) {
                  // 通过eventChannel向被打开页面传送数据
                  console.log('[liro-debug]: navigate to idmesg feedback page')
                }
              })
              /*
              wx.request({
                url: 'https://dingyinglai.site/wxapp/wxsubscribes',
                method: "POST",
                data: {
                  "authsession": app.globalData.authsession,
                  "subscribeid": 2,
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // post ,it is different get!!!!
                },
                success: function (res) {
                  console.log(res.data)         
                }
              })
              */
            }
            

          })


        } else {//这里是点击了取消以后
          console.log('[liro-debug]:不提交')
        }
      }
    })


  },
  next: function () {
    console.log('form发生了reset事件')
    wx.reLaunch({
      url: '/pages/patient/patientcase/patientcase',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        console.log('[liro-debug]: navigate to feedback page')
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    this.setData({
      userInfo: app.globalData.userInfo,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("[liro-debug]: idmessage onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    //var detail = e.user.value.user;
    console.log("[liro-debug]: idmessage onshow")
    var mythis = this
    mythis.setData({
        reqid:4
    });
    wx.request({
      url: 'https://dingyinglai.site/wxapp/querymysqldb',
      method: "POST",
      data: {
        "reqid": mythis.data.reqid,    //get idmessage information  id = 4
        "authsession": app.globalData.authsession,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // post ,it is different get!!!!
      },
      success: function (res) {
        console.log(res.data)
        wx.hideLoading()
        if( res.data.sex == 'man'){
          mythis.setData({
            sex: true,
            _sex: false,
          })
        }
        if( res.data.sex == 'women'){
          mythis.setData({
            _sex: true,
            sex: false,
          })
        }
        
        mythis.setData({
          name:res.data.name,
          age: res.data.age,
          department: res.data.department,
          telephone : res.data.telephone,
        });
        /*
        wx.redirectTo({
          url: '/pages/feedbackpage/idmesg/idmesg?info=' + res.data,
          success: function (res) {
            // 通过eventChannel向被打开页面传送数据
            console.log('[liro-debug]: navigate to idmesg feedback page')
          }
        })
        */
      }
      

    })

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