// pages/deposit-integral/deposit-integral.js
var http = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  beforeRead(event) {
    const { file, callback } = event.detail;
    callback(file.type === 'image');
  },
  afterRead(event) {
    const { file } = event.detail;
    console.log(file);
    const { fileList = [] } = this.data;
    fileList.push({ url: file.url,deletable:true });
    this.setData({ fileList });
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    // wx.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
    //   filePath: file.url,
    //   name: 'file',
    //   formData: { user: 'test' },
    //   success(res) {
    //     // 上传完成需要更新 fileList
    //     const { fileList = [] } = this.data;
    //     fileList.push({ ...file, url: res.data });
    //     this.setData({ fileList });
    //   },
    // });
  },
  deletePhone(event){
    let index = event.detail.index;
    const { fileList = [] } = this.data;
    fileList.splice(index,1);
    this.setData({ fileList });
  },
  oversize(event){
    wx.showToast({
      title: '请上传图片小于10M',
      icon:"none"
    })
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