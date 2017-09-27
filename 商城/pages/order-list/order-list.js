var wxpay = require('../../utils/pay.js');
var app = getApp();
Page({
  data:{
    statusType: ["待付款", "待发货", "待收货", "待评价", "已完成"],
    currentType:0,
    tabClass: ["", "", "", "", ""]
  },
  statusTap:function(e){
     var curType =  e.currentTarget.dataset.index;
     this.data.currentType = curType
     this.setData({
       currentType:curType
     });
     this.onShow();
  },
  orderDetail : function (e) {
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/order-details/order-details?id=" + orderId
    })
  },
  cancelOrderTap:function(e){
    var that = this;
    let requestUrl = app.globalData.requestUrl;
    var orderId = e.currentTarget.dataset.id;
     wx.showModal({
      title: '确定要取消该订单吗？',
      content: '',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading();
          wx.request({
            url: requestUrl + 'api/order/'+orderId+'/delete',
            method: 'DELETE',
            success: (res) => {
              wx.hideLoading();
              if (res.data.message) {
                that.onShow();
              }
            }
          })
        }
      }
    })
  },
  toPayTap:function(e){
    var orderId = e.currentTarget.dataset.id;
    var money = e.currentTarget.dataset.money;
    wxpay.wxpay(app, money, orderId, "/pages/order-list/order-list");
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    console.log(app.globalData.token);
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
 
  },
  getOrderStatistics : function () {
    let requestUrl = app.globalData.requestUrl;
    var that = this;
    wx.request({
      url:  requestUrl + '/api/order/all',
      success: (res) => {
        wx.hideLoading();
      }
    })
  },
  onShow:function(){
    // 获取订单列表
    wx.showLoading();
    var that = this;
    let requestUrl = app.globalData.requestUrl;
    let openId = app.globalData.token;
    this.getOrderStatistics();
    wx.request({
      url:  requestUrl + '/api/order/'+ openId,
      success: (res) => {
        wx.hideLoading();
        console.log(res.data);
        if (res) {
          that.setData({
            orderList: res.data.orders,
          });
        } else {
          this.setData({
            orderList: null,
          });
        }
      }
    })
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
 
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
 
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
   
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  
  }
})