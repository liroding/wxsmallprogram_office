// pages/patientcase/patientcase.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    PEA_Data: {},
    PEB_Data: {},
    PEC_Data: {},
    caseimagesList : [],
    syncflag_items :null,   //sync itemsdata info and caseimages,for navigate to patientcase feedback page
    syncflag_caseimg :null,
    retserverinfo:'',

    //1:PEA  items
    PEA: [
      { name: 'PEA-1', value: '晨光B5 100页' },
      { name: 'PEA-2', value: '晨光B5 60页'},
      { name: 'PEA-3', value: '晨光B5无线装订本100页' },
      { name: 'PEA-4', value: '晨光1650缝线本' },  
     // { name: '1-5', value: '暂无',checked: 'true'},   // checked: 'true'
    ],
    //2:PEB  radioItems
    PEB: [
      { name: 'PEB-1', value: '晨光中性替芯 0.5mm 黑' },
      { name: 'PEB-2', value: '晨光中性替芯 0.5mm 红' },
      { name: 'PEB-3', value: '晨光中性替芯 0.5mm 蓝' },
      { name: 'PEB-4', value: '晨光中性替芯 0.5mm 黄' },
  //    { name: '2-5', value: '暂无', checked: 'true' },
    ],
    //3:PEC uploadpicitems
    PEC: [
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
    
    //4:PED  MechanicalItems
    PED: [
      { name: 'PED-1', value: '麦肯基' },
      { name: 'PED-2', value: 'FMS'},

     // { name: '1-5', value: '暂无',checked: 'true'},   // checked: 'true'
    ],

    img: '/resources/index_bakcup/1.png'
  },

  _bindPEA: function (e) {
    var mythis = this 
    console.log('_bindPEA 发送选择改变，携带值为', e.detail.value)
    this.setData({
      PEA_Data: e.detail.value
    })
  },
  _bindPEB: function (e) {
    var checked = e.detail.value
    console.log('_bindPEB 发送选择改变，携带值为', e.detail.value)
    var changed = {}
    for (var i = 0; i < this.data.PEB.length; i++) {
      if (checked.indexOf(this.data.PEB[i].name) !== -1) {
        changed['PEB[' + i + '].checked'] = true
      } else {
        changed['PEB[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
    this.setData({
      PEB_Data: e.detail.value
    })
  },

  _bindPEC: function (e) {
    var mythis = this 
    console.log('_bindPEC 发送选择改变，携带值为', e.detail.value)
    this.setData({
      PEC_Data: e.detail.value
    })
  },

  _bindPED: function (e) {
    var mythis = this 
    console.log('_bindPED 发送选择改变，携带值为', e.detail.value)
    this.setData({
      PED_Data: e.detail.value
    })
  },




  formSubmit: function (e) {
    var mythis = this
    console.log('[liro-debug]:form发生了submit事件，携带数据为PEA_Data=', mythis.data.PEA_Data)
    console.log('[liro-debug]:form发生了submit事件，携带数据为PEB_Data=', mythis.data.PEB_Data)
    console.log('[liro-debug]:form发生了submit事件，携带数据为PEC_Data=', mythis.data.PEC_Data)
    console.log('[liro-debug]:form发生了submit事件，携带数据为PED_Data=', mythis.data.PED_Data)

    wx.showModal({
      title: '提示',
      content: '再确认是否提交',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          console.log('[liro-debug]:确认提交')

          wx.showLoading({
            title: '提交中',
          })

   /////////////////////////////////////////////////////////////////////////       
         let promise1 = new Promise(function (resolve, reject) {
                          //submit case 1/2/3
          wx.request({
            url: 'https://dingyinglai.site/wxapp/patientcasemesgsubmit',
            method: "POST",
            data: {
              "PEA_Data": mythis.data.PEA_Data,
              "PEB_Data": mythis.data.PEB_Data,
              "PEC_Data": mythis.data.PEC_Data,
              "authsession": app.globalData.authsession,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // post ,it is different get!!!!
            },

            success: function (res) {
              console.log(res.data) 
              retserverinfo = res.data                  
              mythis.data.syncflag_items = 1
              console.log('nihoa')
              return resolve(mythis.data.syncflag_items)
              

            }
          })
        });


        let promise2 = new Promise(function (resolve, reject) {
          //upload case img 
          console.log("[liro-debug] 1>" + mythis.data.caseimagesList.length)
          if(mythis.data.caseimagesList.length > 0){
            for(var i = 0; i < mythis.data.caseimagesList.length; i ++)
            {
                var imgurl = mythis.data.caseimagesList[i]
                console.log(imgurl)
                wx.uploadFile({
                  url: 'https://dingyinglai.site/wxapp/fileupload',
                  filePath: imgurl,
                  name: 'file',
                  header: {
                      "Content-Type": "multipart/form-data",
                      'Content-Type': 'application/json'
                  },
                  formData: {
                    'authsession': app.globalData.authsession,
                    "uploadid"  : 1,
                    "casepicid" : i,
                  },
                  success:function(data){
                      console.log(data);
                      mythis.data.syncflag_caseimg = 1
                      return resolve(mythis.data.syncflag_caseimg)
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
                  },
                  fail:function(data){
                      console.log(data);
                  }
              }) 
  
            }
          }else{
            mythis.data.syncflag_caseimg = 1
            return resolve(mythis.data.syncflag_caseimg)
          }
        });

        Promise.all([
          promise1, promise2
        ]).then(res => {

          console.log(mythis.data.syncflag_items)
          console.log(mythis.data.syncflag_caseimg)
          console.log(res)
          wx.hideLoading()

          wx.navigateTo({
             url: '/pages/feedbackpage/patientcase/patientcase?info=' + retserverinfo,
             success: function (res) {
               // 通过eventChannel向被打开页面传送数据
               console.log('[liro-debug]: navigate to patientcase feedback page')
             }
           })

        })
    
  



        } else {//这里是点击了取消以后
          console.log('[liro-debug]:不提交')
        }
      }
    })

  },

  // 图片上传
selectcaseimg:function(){

      var that=this;
//      let imagesList=[]; 
      let maxSize=1024*1024;
      let maxLength=11; 
      let flag=true;
      console.log('[liro-debug]: patientcase page select image upload')
      wx.chooseImage({
            count: 11, //最多可以选择的图片总数
            sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) { 
            wx.showToast({
                    title: '正在上传...',
                    icon: 'loading',
                    mask: true,  
                    duration: 500
            })
            for(let i=0;i<res.tempFiles.length;i++){
                  if(res.tempFiles[i].size>maxSize){  //Size < 1M
                        flag=false;
                        console.log(111) 
                        wx.showModal({ 
                              content: '图片太大，不允许上传',
                              showCancel: false, 
                              success: function (res) {
                                      if (res.confirm) {
                                          console.log('用户点击确定')
                                      }
                              }
                        });
                  }
            }
           
            if (res.tempFiles.length>maxLength){
                console.log('222'); 
                wx.showModal({
                    content: '最多能上传'+maxLength+'张图片', 
                    showCancel:false,
                    success:function(res){ 
                    if(res.confirm){ 
                          console.log('确定');
                    }
                    }
                })
              }
             
            if (flag == true && res.tempFiles.length <= maxLength){
                that.setData({
                        caseimagesList: res.tempFilePaths                         
                })
            }
  
/*
            var authsession = wx.getStorageSync('authsession')
            */
            console.log("[LIRO-DEBUG]" + res);
  
            },
  
        fail:function(res){ 
              console.log(res); 
        }
  
  })
  
  },

  //预览图片，放大预览
  previewImage:function(e) {
   
  let index = e.currentTarget.dataset.index;   
  console.log('[LIRO-DEBUG]:' + index)
  wx.previewImage({  
    //当前显示下表   
    current: this.data.caseimagesList[index],   
    //数据源   
    urls: this.data.caseimagesList
    }) 
},


chooseWxImage: function (type) {
  var that = this;
  wx.chooseImage({
    sizeType: ['original', 'compressed'],
    sourceType: [type],
    success: function (res) {
      console.log(res);
      that.setData({
        // tempFilePath可以作为img标签的src属性显示图片
        img: res.tempFilePaths[0],
      })

      var authsession = wx.getStorageSync('authsession')
      
      wx.uploadFile({
        url: 'https://dingyinglai.site/wxapp/fileupload', //仅为示例，非真实的接口地址
        filePath: res.tempFilePaths[0],
        name: 'file',
        formData: {
          'authsession': authsession,
          "uploadid"  : 2,
        },
        success(res) {
          const data = res.data
          //do something
        }
      })




    }
  })
},

chooseimage: function () {
  var that = this;
  wx.showActionSheet({
    itemList: ['从相册中选择', '拍照'],
    itemColor: "#a3a2a2",
    success: function (res) {

      if (!res.cancel) {
        if (res.tapIndex == 0) {
          that.chooseWxImage('album')
        } else if (res.tapIndex == 1) {
          that.chooseWxImage('camera')
        }
      }
    }
  })
},







  formReset: function () {
    console.log('[liro-ding]:form发生了reset事件')
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

  }
})