// pages/integral-center/integral-center.js
var http = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getIntegralRecords:[],
    membershipIntegral:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if(options.membershipIntegral){
      this.setData({
        membershipIntegral:options.membershipIntegral
      });
    }
    
    this.getIntegralRecords();
  },

  getIntegralRecords:function(){
      var that = this;
      wx.showLoading();
      var params = {
        url: "/integral/getIntegralRecords",
        method: "POST",
        data: {},
        callBack: function(res) {
          wx.hideLoading();
          console.log("getIntegralRecords",res);
          that.setData({
            getIntegralRecords: res
          });
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

  },
  toDepositIntegral: function(){
    wx.navigateTo({
      url: '/pages/deposit-integral/deposit-integral'
    })
  }
})