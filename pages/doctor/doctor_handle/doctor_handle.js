// pages/doctor/doctor.js
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

    //此代表患者对应的authsession,通过后端反馈出来；在进行医师诊断中被使用
    patient_authsession:null,
    //PE
    PEA:null,
    PEB:null,
    PEC:null,
    PEImglist:null,

    reqid:null,

    //弹窗
    showModal:false,

    //check doctor type
    checkerdoctorid:null,
    //PEA
    PEA_data: [

      { name: 'PEA-1', value: '晨光B5 100页' },
      { name: 'PEA-2', value: '晨光B5 60页'},
      { name: 'PEA-3', value: '晨光B5无线装订本100页' },
      { name: 'PEA-4', value: '晨光1650缝线本' }, 

    ],
    //PEB
    PEB_data: [

      { name: 'PEB-1', value: '晨光中性替芯 0.5mm 黑' },
      { name: 'PEB-2', value: '晨光中性替芯 0.5mm 红' },
      { name: 'PEB-3', value: '晨光中性替芯 0.5mm 蓝' },
      { name: 'PEB-4', value: '晨光中性替芯 0.5mm 黄' },
      { name: 'PEB-5', value: '暂无', checked: 'true' },
    ],
    PEC_data: [
  
      { name: 'PEC-1', value: '晨光12号订书钉' },
      { name: 'PEC-2', value: '晨光15g超强固体胶'},
      { name: 'PEC-3', value: '晨光起钉器盒装' },
      { name: 'PEC-4', value: '晨光卷笔刀' },   // checked: 'true'
      { name: 'PEC-5', value: '晨光单长押夹' },
      { name: 'PEC-6', value: '晨光磁粒ASC99366'},
      { name: 'PEC-7', value: '晨光带磁吸白板擦' },
      { name: 'PEC-8', value: '本味文件夹' }, 
      { name: 'PEC-9', value: '备用资料袋' },   
      { name: 'PEC-10', value: '荧光笔' }, 
      { name: 'PEC-11', value: '晨光普透封箱胶带' },   


    ],
    IMP_RA :'',
    IMP_RB :'',
    IMP_RC :'',
    IMP_SCHEME :'',

  },


    //预览图片，放大预览
    previewImage:function(e) {
   
      let index = e.currentTarget.dataset.index;   
      console.log('[LIRO-DEBUG]:' + index)
      wx.previewImage({  
        //当前显示下表   
        current: this.data.PEImglist[index],   
        //数据源   
        urls: this.data.PEImglist
        }) 
    },

    doctor_preview: function (e) {
      console.log(e.currentTarget.id)
      var mythis = this
      console.log('previed onload')
      //clear data
      mythis.data.name = null
    
      mythis.data.sex = null

      mythis.data.PEImglist = null


      this.setData({
         userInfo: app.globalData.userInfo,
         authsession: app.globalData.authsession
      })
  
      wx.showLoading({
        title: '获取数据中',
      })
      
      if (e.currentTarget.id == 'search_a'){
        console.log('[liro-debug]: search_a')
        mythis.data.reqid = 1
      }else if(e.currentTarget.id == 'search_b'){
        console.log('[liro-debug]: search_b')
        mythis.data.reqid = 2
      }
       
      //请求数据库，获取所有提交的信息
      wx.request({
        url: 'https://dingyinglai.site/wxapp/querymysqldb',
         method: "POST",
         data: {
            "reqid": mythis.data.reqid,    //get all submit information  id = 5
            "authsession": app.globalData.authsession,
         },
         header: {
           'content-type': 'application/x-www-form-urlencoded' // post ,it is different get!!!!
         },
         success: function (res) {
             console.log(res.data)
             mythis.setData({
                patient_authsession : res.data.authsession,
             })

             wx.hideLoading()
             if (mythis.data.patient_authsession == null){
              wx.showToast({
                title: '无新数据可查！' ,  
                icon: 'fail',
                duration: 6000//持续的时间
              })

             }else{
              mythis.setData({
                name: res.data.name,
                sex: res.data.sex,
                age: res.data.age,
                department: res.data.department,
                telephone: res.data.telephone,
 
                PEA: res.data.PEA,
                PEB: res.data.PEB,
                PEC: res.data.PEC,
                PEImglist: res.data.PEImglist,
 
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
    },

    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

/******
 ****弹窗
**************/
 
showDialogBtn_doctor: function () {
  this.setData({
     showModal: true,
     checkerdoctorid : 'doctor'
  })
}, 
showDialogBtn_consultants: function () {
  this.setData({
     showModal: true,
     checkerdoctorid : 'consultants'
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
  * 对话框确认按钮点击事件,进行医护诊断提交
  */
  onConfirm: function (e) {
    var mythis = this
    wx.request({
      url: 'https://dingyinglai.site/wxapp/diagnoseresultsubmit',
      method: "POST",
      data: {
        "IMP_RA": mythis.data.IMP_RA,
        "IMP_RB": mythis.data.IMP_RB,
        "IMP_RC": mythis.data.IMP_RC,
        "IMP_SCHEME": mythis.data.IMP_SCHEME,


        "authsession": mythis.data.patient_authsession,
        "checkerdoctorid": mythis.data.checkerdoctorid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // post ,it is different get!!!!
      },

      success: function (res) {
        console.log(res.data) 
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000 
        })
        mythis.hideModal();
        console.log('[liro-debug]:input doctor id = ' + e.currentTarget.id)
        console.log('[liro-debug] :input data =' + mythis.data.IMP_RA + mythis.data.IMP_RB + mythis.data.IMP_RC )
/*           
        wx.hideLoading() 
        wx.navigateTo({
         // url: '../feedbackpage/patientcase/patientcase?info=' + res.data,
          success: function (res) {
            // 通过eventChannel向被打开页面传送数据
            console.log('[liro-debug]: navigate to patientcase feedback page')
          }
        })
*/
      }
    })

  },
  inputChangeResult_1:function(e){
    //console.log(e.detail.value)
    this.setData({
      IMP_RA:e.detail.value
    })
  },
  inputChangeResult_2:function(e){
   // console.log(e.detail.value)
    this.setData({
      IMP_RB:e.detail.value
    })
  },
  inputChangeResult_3:function(e){
   // console.log(e.detail.value)
    this.setData({
      IMP_RC:e.detail.value
    })
  },
  //资料方案 1：方案A  2：方案B  3：方案C
  inputChangescheme_option:function(e){
    // console.log(e.detail.value)
     this.setData({
       IMP_SCHEME:e.detail.value
     })
   },

  
})