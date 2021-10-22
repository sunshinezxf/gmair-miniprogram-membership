// pages/membership-center/membership-center.js
var http = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    membershipIntegral:0,
   
    prodList: [],
    current: 1,
    size: 10,
    pages: 0,
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
    this.getMembershipProd();
  },
  
  getMembershipProd:function(){
    var ths = this;
    wx.showLoading();
    var params = {
      url: "/membership/center/listProds",
      method: "GET",
      data: {
        current: ths.data.current,
        size: ths.data.size,
      },
      callBack: function(res) {
        console.log(res);
        let list = []
        if (res.current == 1) {
          list = res.records
        } else {
          list = ths.data.prodList
          list = list.concat(res.records)
        }
        ths.setData({
          prodList: list,
          pages: res.pages
        });
        wx.hideLoading();
      }
    };
    http.request(params);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.current < this.data.pages) {
      this.setData({
        current: this.data.current + 1
      })
      this.getMembershipProd()
    }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})