// pages/deposit-integral/deposit-integral.js
var http = require("../../utils/http.js");
var config = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    fileUploadList:[],
    deviceModel: '',
    description: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  beforeRead(event) {
    const {
      file,
      callback
    } = event.detail;
    callback(file.type === 'image');
  },
  afterRead(event) {
    const {
      file
    } = event.detail;
    console.log(file);
    var that = this;
    var imageUploadUrl = config.imageUploadUrl;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: imageUploadUrl, // 非真实的接口地址
      filePath: file.url,
      header: {
        "Content-Type": "multipart/form-data"
      },
      name: 'image',
      success(res) {
        console.log("JSON.parse(res.data).data.fileUrl",JSON.parse(res.data).data.fileUrl);
        // 上传完成需要更新 fileList
        const {
          fileList = []
        } = that.data;
        const {
          fileUploadList = []
        } = that.data;

        fileList.push({
          url: file.url,
          deletable: true
        });
        fileUploadList.push({
          url: JSON.parse(res.data).data.fileUrl
        });
        that.setData({
          fileList,
          fileUploadList
        });
      },
    });
  },
  deletePhone(event) {
    let index = event.detail.index;
    const {
      fileList = []
    } = this.data;
    fileList.splice(index, 1);
    this.setData({
      fileList
    });
  },
  oversize(event) {
    wx.showToast({
      title: '请上传图片小于10M',
      icon: "none"
    })
  },
  onDeviceModelChange(event) {
    this.setData({
      deviceModel:event.detail
    });
  },
  onRemarkChange(event) {
    this.setData({
      description:event.detail
    });
  },

  dataSubmit(e) {
    if(this.data.fileList.length==0){
      wx.showToast({
        title: '请上传至少一张图片',
        icon:"none"
      });
      return;
    }
    if(this.data.deviceModel==null||this.data.deviceModel.length==0){
      wx.showToast({
        title: '设备型号不可为空',
        icon:"none"
      });
      return;
    }
    if(this.data.description==null||this.data.description.length==0){
      wx.showToast({
        title: '申请描述不可为空',
        icon:"none"
      });
      return;
    }
    if(this.data.description.length>20){
      wx.showToast({
        title: '最多输入20个字',
        icon:"none"
      });
      return;
    }

    var that = this;
    wx.showLoading();
    var params = {
      url: "/p/integral/supplementaryIntegral",
      method: "POST",
      data: {
        pictures: that.getPictures(),
        deviceModel: that.data.deviceModel,
        description: that.data.description
      },
      callBack: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '提交成功',
        });
        that.setData({
          fileList: [],
          fileUploadList: [],
          deviceModel:'',
          description:''
        });
      }
    };
    http.request(params);
  },
  getPictures:function(){
    let pictureList = this.data.fileUploadList;
    var pictures = '';
    for(let i=0,len=pictureList.length;i<len;i++){
      pictures += pictureList[i].url;
      if(i!=len-1){
        pictures += ',';
      }
    }
    return pictures;
  },
  scanCall:function(){
    var that = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success (res) {
        console.log(res);
        let scanResult = res.result;
        let index = scanResult.lastIndexOf("\/");
        let lastStr = scanResult.substring(index + 1,scanResult.length);
        that.setData({
          deviceModel:lastStr
        });
      }
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