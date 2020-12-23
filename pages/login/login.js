// pages/login/login.js
// pages/index_bakcup/index.js
const app = getApp()

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {

    tabs: ["微信授权", "编号验证"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,


    items: [
      {name: 'agreeflag', value: '阅读并同意以下协议', checked: 'false'},
    ],
    _globalagreeflag:0,

    background: ['/resources/office_pic/head_1.jpg', '/resources/office_pic/head_2.jpg', '/resources/office_pic/head_3.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,

    motto: 'Every Step Is Progress',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    flag: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log('[liro-debug]: <login page> onload')
    if (app.globalData.userInfo) {

      wx.showModal({
        title: '注册提示',
        content: '您已微信授权，点击确认按钮，直接进入',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            console.log('[liro-debug]:确认授权') 
            wx.navigateTo({
              url: '/pages/userselection/userselection'
            })

          } else {//这里是点击了取消以后
            console.log('[liro-debug]:不授权')
          }
        }
      })

    }

    var that = this;
    wx.getSystemInfo({
        success: function(res) {
            that.setData({
                sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
            });
        }
    });



  },


  tabClick: function (e) {
    this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
    });
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


//按钮的点击事件
bindGetUserInfo: function (res) {
      var mythis = this 
      let info = res;
      console.log(info);
      if (mythis.data._globalagreeflag == 'agreeflag'){
        if (info.detail.userInfo) {
          console.log("[liro-debug]:点击了同意授权");
          app.globalData.userInfo = info.detail.userInfo
          var that = this
          // 登录  add by ding to send username & code 
          wx.login({
          success: res => {
            console.log('[liro-debug]: wx.code ='+res.code)  //debug
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            wx.showLoading({
              title: '获取授权...',
            })

            if (res.code) {

              wx.request({
                url: 'https://dingyinglai.site/wxapp/onlogin',
                method: "GET",
                data: {
                  "code": res.code,
                  "username": info.detail.userInfo.nickName
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  wx.hideLoading()
                  console.log('[liro-debug]: server return authsession ')
                  console.log('[liro-debug]: authsession='+ res.data.authsession)
                  var _tmpdata  = res.data.authsession
                  if (_tmpdata.length !=0 ) {
                    app.globalData.authsession = res.data.authsession
                    wx.setStorage({
                      key: "authsession",
                      data: res.data.authsession,
                    })
                  //console.log('<debug>' + info.detail.userInfo.nickName)
                 //   wx.hideLoading()
                    wx.redirectTo({
                    // url: '../index/index'
                    url: '../userselection/userselection'
                    })
                  }else{
                    console.log('nihao')
                    wx.showModal({
                      title: '登陆失败',
                      content: '获取authsession为空，无法进行下一步操作',
                      showCancel: false,
                      confirmText: '重新登陆',
                      success: function (res) {
                           if (res.confirm) {
                             console.log('[liro-debug]: 用户点击了“重新登陆”')
                             wx.redirectTo({
                              // url: '../index/index'
                              url: '/pages/index/index'
                            })
                           }
                     
                          }
                      })
                  }

                }
              })
            } else {
              wx.showToast({
                title: '授权失败' ,  
                icon: 'fail',
                duration: 60000//持续的时间
              })
              console.log('获取用户登录态失败：' + res.errMsg)
            }

          }
        })

        wx.requestSubscribeMessage({
          tmplIds: ['yknmtxHzvfU4rE84aa9si5LuV0gAW_7KGzEXz7FQgN0'], // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
          tmplIds: ['8qZXmYaPl9gJsUFQmhtDb73gvkP-lKFivLyroyTpeyI'],
          success (res) {
            console.log('已授权接收订阅消息')
          }
        })


        } else {
              //用户按了拒绝按钮
              wx.showModal({
                    title: '警告',
                    content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                    showCancel: false,
                    confirmText: '返回授权',
                    success: function (res) {
                           if (res.confirm) {
                              console.log('[liro-debug]: 用户点击了“返回授权”')
                          }
                        }
                    })
              }
      }
      else{
        wx.showModal({
          content: '请确认是否同意如下协议', 
          showCancel:false,
          success:function(res){ 
          if(res.confirm){ 
                console.log('[liro-debug]: 点击了确定按钮');
          }
          }
         })
      }

},


bindViewTap: function () {
  wx.navigateTo({
    url: '/pages/userselection/userselection'
  })
},

_bindlogin: function (e) {
  var mythis = this 
  console.log('_bindlogin 发送选择改变，携带值为', e.detail.value)
  this.setData({
    _globalagreeflag: e.detail.value
  })
},


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    console.log('[liro-debug]: <login page> onready')
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      console.log('[liro-debug]: <login page> onshow') 

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