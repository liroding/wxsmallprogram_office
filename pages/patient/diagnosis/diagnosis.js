var base64 = require("../../../resources/images/base64");
const app = getApp()

Page({
    data: {
        IMP_RA :'',
        IMP_RB :'',
        IMP_RC :'',
        reqid:null,
    },

    onLoad: function(e){
        var mythis = this
        mythis.setData({
            reqid:3
        });

      //请求数据库，获取所有提交的信息
        wx.request({
        url: 'https://dingyinglai.site/wxapp/querymysqldb',
         method: "POST",
         data: {
            "reqid": mythis.data.reqid,    //get doctor IMP result information  id = 3
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
                IMP_RA: res.data.IMP_RA,
                IMP_RB: res.data.IMP_RB,
                IMP_RC: res.data.IMP_RC,
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