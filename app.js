//app.js
App({
  onLaunch: function () {
    console.log("[liro-debug]: <app page> onLaunth")
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
//add by liro for debug
    const res = wx.getSystemInfoSync()
////////////////////////////////////////   
  
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("[liro-debug] <app page> res = ",res)
        if (res.authSetting['scope.userInfo']) { 
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log("[liro-debug]: <app page> userInfo = ",this.globalData.userInfo)
             
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
/*
          wx.showModal({
            title: '登陆提示',
            content: '您首次使用，点击授权按钮',
            success: function (res) {
              if (res.confirm) {//这里是点击了确定以后
                console.log('[liro-debug]:确认授权')    
              } else {//这里是点击了取消以后
                console.log('[liro-debug]:不授权')
                wx.navigateBackMiniProgram({
                  complete: (res) => {
                    delta: 1
                  },
                })
              }
            }
          })

*/
        }
      }
    })
    


  },
  globalData: {
    userInfo: null,
    authsession:null,
    wxcodereqflag:1,
  }
})