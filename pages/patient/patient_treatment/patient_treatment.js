var base64 = require("../../../resources/images/base64");
const app = getApp()

Page({
    data:{
        schemeid:0,
    },

    onLoad: function(e){
        var mythis = this
        mythis.setData({
            icon20: base64.icon20,
            icon60: base64.icon60
        });

      //请求数据库，获取治疗方案
        wx.request({
        url: 'https://dingyinglai.site/wxapp/patientscheme',
         method: "POST",
         data: {
            "authsession": app.globalData.authsession,
         },
         header: {
           'content-type': 'application/x-www-form-urlencoded' // post ,it is different get!!!!
         },
         success: function (res) {
             console.log(res.data)
             wx.hideLoading()
             if (res.data == 'has not be checked'){
              wx.showToast({
                title: '无新数据可查！' ,  
                icon: 'fail',
                duration: 3000//持续的时间
              })

             }else{
                mythis.setData({
                    schemeid: res.data.schemeid,
              })
             }
             

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


  
    }



});