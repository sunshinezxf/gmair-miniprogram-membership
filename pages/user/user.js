// pages/user/user.js

var http = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderAmount: '',
    sts: '',
    collectionCount: 0,
    membershipIntegral:0,
    membershipFlag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    //加载订单数字
    var ths = this;
    // var status = ths.data.status
    wx.showLoading();
    var params = {
      url: "/p/myOrder/orderCount",
      method: "GET",
      data: {},
      callBack: function(res) {
        wx.hideLoading();
        ths.setData({
          orderAmount: res
        });
      }
    };
    http.request(params);
    this.showCollectionCount();
    this.validMembership();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  toMembershipCenter: function () {
    wx.navigateTo({
      url: '/pages/membership-center/membership-center?membershipIntegral='+this.data.membershipIntegral
    })
  },

  toIntegralCenter: function() {
    wx.navigateTo({
      url: '/pages/integral-center/integral-center?membershipIntegral='+this.data.membershipIntegral
    })
  },

  toMyCouponPage: function() {
    wx.showToast({
      icon: "none",
      title: '待开发'
    })
  },

  toAddressList: function() {
    wx.navigateTo({
      url: '/pages/delivery-address/delivery-address',
    })
  },

  // 成为会员
  toBeMembership: function() {
    var ths = this;
    wx.showLoading();
    var params = {
      url: "/p/membership/joinMemebership",
      method: "POST",
      data: {},
      callBack: function(res) {
        wx.hideLoading();
        ths.setData({
          membershipFlag:1
        });
        wx.showToast({
          title: '加入成功',
          icon: "none",
          duration: 2000
        });
        wx.setStorageSync('membershipFlag',true);
      }
    };
    http.request(params);
  },

  toOrderListPage: function(e) {
    var sts = e.currentTarget.dataset.sts;
    wx.navigateTo({
      url: '/pages/orderList/orderList?sts=' + sts,
    })
  },
  /**
   * 查询所有的收藏量
   */
  showCollectionCount: function() {
    var ths = this;
    wx.showLoading();
    var params = {
      url: "/p/user/collection/count",
      method: "GET",
      data: {},
      callBack: function(res) {
        wx.hideLoading();
        ths.setData({
          collectionCount: res
        });
      }
    };
    http.request(params);
  },
  validMembership:function(){
    let validFlag = wx.getStorageSync('membershipFlag');
    console.log("validFlag",validFlag)
    if(validFlag==null||typeof validFlag == "undefined"||validFlag == ""){
      // console.log("not has membershipFlag");
      this.isMembership();
    }else{   
      // console.log("has membershipFlag");
      this.setData({
        membershipFlag:validFlag
      });
      if(validFlag){
        this.showMembershipIntegral();
      }
      
    }
  },
  isMembership: function(){
    var ths = this;
   
    wx.showLoading();
    var params = {
      url: "/p/membership/isMembership",
      method: "POST",
      data: {},
      callBack: function(res) {
        wx.hideLoading();
        // console.log("isMembership",res);
        if(res){
          wx.setStorageSync('membershipFlag',true);
          ths.showMembershipIntegral();
          ths.setData({
            membershipFlag:true
          });  
        }else{
          wx.setStorageSync('membershipFlag',false);
        }
      }
    };
    http.request(params);
  },
  showMembershipIntegral: function(){
    var ths = this;
    console.log("showMembershipIntegral:function");
    wx.showLoading();
    var params = {
      url: "/p/integral/getIntegral",
      method: "POST",
      data: {},
      callBack: function(res) {
        wx.hideLoading();
        ths.setData({
          membershipIntegral: res
        });
      }
    };
    http.request(params);
  },
  /**
   * 我的收藏跳转
   */
  myCollectionHandle: function() {
    var url = '/pages/prod-classify/prod-classify?sts=5';
    var id = 0;
    var title = "我的收藏商品";
    if (id) {
      url += "&tagid=" + id + "&title=" + title;
    }
    wx.navigateTo({
      url: url
    })
  }


})