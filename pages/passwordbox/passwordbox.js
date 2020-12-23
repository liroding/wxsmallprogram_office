//passwordbox.js
//获取应用实例
const app = getApp()
 
Page({
    data: {
       showPayPwdInput: false, //是否展示密码输入层
       pwdVal: '', //输入的密码
       payFocus: true, //文本框焦点
       password: '140602'
    },
     onLoad: function () {
     this.showInputLayer();
},
/**
* 显示支付密码输入层
*/
showInputLayer: function(){
     this.setData({ showPayPwdInput: true, payFocus: true });
},
/**
* 隐藏支付密码输入层,判断密码是否正确，根据结果进行跳转
*/
hidePayLayer: function(){
      console.log('hidePayLayer')
      var val = this.data.pwdVal;
 
      this.setData({ showPayPwdInput: false, payFocus: false, pwdVal: '' }, function(){
          console.log('您输入密码：',val)
          if (val == this.data.password){
            console.log('[liro-debug] password pass')
            wx.showToast({
              title: '正确',
            })
            wx.navigateTo({
              // url: '../index/index'
              url: '/pages/doctor/doctor_homepage/doctor_homepage'
            })

          }else{

            console.log('[liro-debug] password fail')
            wx.showToast({
              title: '错误',
              duration: 10000//持续的时间
            })
            wx.navigateTo({
             
              url: '/pages/userselection/userselection'
             })

          }
               
      
});
 
},
/**
* 获取焦点
*/
getFocus: function(){
      this.setData({ payFocus: true });
},
/**
* 输入密码监听
*/
inputPwd: function(e){
      this.setData({ pwdVal: e.detail.value });
 
      if (e.detail.value.length >= 6){
         this.hidePayLayer();
      }
}
})