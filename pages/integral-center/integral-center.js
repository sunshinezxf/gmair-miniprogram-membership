// pages/integral-center/integral-center.js
var http = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    membershipIntegral: 0,
    active: 0,
    size: 10,

    integralAddsUnconfirmed: [],
    integralAddsConfirmed:[],
    getIntegralRecords: [],

    addUnconfirmedCurrent: 1,
    addConfirmedCurrent: 1,
    recordCurrent: 1,

    addUnconfirmedPages:0,
    addConfirmedPages:0,
    recordPages:0,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options.membershipIntegral) {
      this.setData({
        membershipIntegral: options.membershipIntegral
      });
    }else{
      this.showMembershipIntegral();
    }
    if(options.active){
      this.setData({
        active: parseInt(options.active)
      });
    }
  },
  onShow: function () {
    
    this.getIntegralRecords();   
    this.getIntegralAddUnconfirmed();
    this.getIntegralAddConfirmed();
  },
  getIntegralRecords: function () {
    var that = this;
    wx.showLoading();
    var params = {
      url: "/integral/getIntegralRecords",
      method: "GET",
      data: {
        current: that.data.recordCurrent,
        size: that.data.size,
       
      },
      callBack: function (res) {
        wx.hideLoading();
        console.log("getIntegralRecords", res);
        let list = []
        if (res.current == 1) {
          list = res.records
        } else {
          list = that.data.getIntegralRecords
          list = list.concat(res.records)
        }
        that.setData({
          getIntegralRecords: list,
          recordPages:Math.ceil(res.total / that.data.size)

        });
      }
    };
    http.request(params);
  },
  showMembershipIntegral: function(){
    var ths = this;
    console.log("showMembershipIntegral:function");
    wx.showLoading();
    var params = {
      url: "/integral/getIntegral",
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
  getIntegralAddConfirmed: function () {
    var that = this;
    wx.showLoading();
    var params = {
      url: "/integral/getIntegralAdds",
      method: "GET",
      data: {
        current: that.data.addConfirmedCurrent,
        size: that.data.size,
        sortType: "CREATETIME",
        status:2,
        isConfirmed:true
      },
      callBack: function (res) {
        wx.hideLoading();
        console.log("getIntegralAddsConfirmed", res);
        let list = []
        if (res.current == 1) {
          list = res.records
        } else {
          list = that.data.integralAddsConfirmed
          list = list.concat(res.records)
        }
        that.setData({
          integralAddsConfirmed: list,
          addConfirmedPages:Math.ceil(res.total / that.data.size)
        });
      }
    };
    http.request(params);
  },
  getIntegralAddUnconfirmed: function () {
    var that = this;
    wx.showLoading();
    var params = {
      url: "/integral/getIntegralAdds",
      method: "GET",
      data: {
        current: that.data.addUnconfirmedCurrent,
        size: that.data.size,
        sortType: "CREATETIME",
        status:0,
        isConfirmed:false
      },
      callBack: function (res) {
        wx.hideLoading();
        console.log("getIntegralAddsUnconfirmed", res);
        let list = []
        if (res.current == 1) {
          list = res.records
        } else {
          list = that.data.integralAddsUnconfirmed
          list = list.concat(res.records)
        }
        that.setData({
          integralAddsUnconfirmed: list,
          addUnconfirmedPages:Math.ceil(res.total / that.data.size)
        });
      }
    };
    http.request(params);
  },
  onTabsChange(event) {
    this.setData({
      
      active:event.detail.index
    });
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
 

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
  onReachBottom: function() {
      console.log("addUnconfirmedpages",this.data.addUnconfirmedPages);
      console.log("addConfirmedpages",this.data.addConfirmedPages);
      console.log("recordPages",this.data.recordPages);
      if(this.data.active==2){
        if (this.data.recordCurrent < this.data.recordPages) {
          this.setData({
            recordCurrent: this.data.recordCurrent + 1
          })
          this.getIntegralRecords();
        }
        
      }else if(this.data.active==0){  
        if (this.data.addUnconfirmedCurrent < this.data.addUnconfirmedPages) {
          this.setData({
            addUnconfirmedCurrent: this.data.addUnconfirmedCurrent + 1
          })
          this.getIntegralAddUnconfirmed();
        }
      }else if(this.data.active==1){
        if (this.data.addConfirmedCurrent < this.data.addConfirmedPages) {
          this.setData({
            addConfirmedCurrent: this.data.addConfirmedCurrent + 1
          })
          this.getIntegralAddConfirmed();
        }
      }
      
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toDepositIntegral: function () {
    wx.navigateTo({
      url: '/pages/deposit-integral/deposit-integral'
    })
  }
})