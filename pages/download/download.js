// pages/download/download.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    plain: false
  },

  download_botton: function (e) {
    var mythis = this;
    this.setData({
      plain: !this.data.plain
    })
    wx.showLoading({
      title: '下载中...',
    })
    //trigger server create xls file
    wx.request({
      url: 'https://dingyinglai.site/wxapp/handlemysqltoxls',
      method: "POST",
      data: {
        "authsession": app.globalData.authsession,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // post ,it is different get!!!!
      },
      success: function (res) {
        
        console.log('[liro-debug]:server return status,', res.data)

        const downloadTask = wx.downloadFile({
          url: 'https://dingyinglai.site/static/tmp/mysqldb.xls', //仅为示例，并非真实的资源
          type: 'xls',
          success(res) {
            console.log(res)
            const filePath = res.tempFilePath
            wx.openDocument({
              filePath: filePath,
              success: function (res) {
                wx.showToast({
                  title: '下载成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.hideLoading()
                console.log(res)
                console.log('打开文档成功')
              }
            })
    
          }   
        })



      }
  
    })
    

/*
    downloadTask.onProgressUpdate((res) => {
      console.log('下载进度', res.progress)
      console.log('已经下载的数据长度', res.totalBytesWritten)
      console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    })
*/
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