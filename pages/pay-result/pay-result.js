// pages/pay-result/pay-result.js
var http = require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sts: 0,
    orderNumbers: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sts: options.sts,
      orderNumbers: options.orderNumbers
    });
  },
  toOrderList: function () {
    wx.navigateTo({
      url: '/pages/orderList/orderList?sts=0'
    })
  },
  toIndex: function () {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  /**
   * 付款
   */
  payAgain: function(e) {
    let that = this;
    wx.showLoading({
      mask: true
    });
    console.log("调用现金支付接口");
    var params = {
      url: "/order/pay",
      method: "POST",
      data: {
        payType: 1,
        orderNumbers: that.data.orderNumbers
      },
      callBack: res => {
        console.log("支付结果的res: ",res);
        if(res.responseCode!="RESPONSE_OK"){
          wx.showToast({
            title: res.description,
            icon:'none',
            duration:2000
          })
          return;
        }
        wx.hideLoading();
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          paySign: res.data.paySign,
          signType:res.data.signType,
          success: e => {
            console.log("支付成功",e);
            wx.redirectTo({
              url: '/pages/pay-result/pay-result?sts=1&orderNumbers=' + that.data.orderNumbers ,
            })
          },
          fail: err => {
            console.log("支付失败",err);
            wx.redirectTo({
              url: '/pages/pay-result/pay-result?sts=0&orderNumbers=' + that.data.orderNumbers ,
            })
          }
        })

      }
    };
    http.request(params);
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