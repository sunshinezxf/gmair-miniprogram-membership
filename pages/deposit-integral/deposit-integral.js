// pages/deposit-integral/deposit-integral.js
var http = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  formSubmit(e) {
    console.log(e.detail.value.integral);
    console.log(e.detail.value.description);
    var that = this;
    wx.showLoading();
    var params = {
      url: "/p/integral/deposit",
      method: "POST",
      data: {
        integral:e.detail.value.integral,
        description:e.detail.value.description
      },
      callBack: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '提交成功',
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