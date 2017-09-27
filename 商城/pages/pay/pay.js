const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allGoodsAndYunPrice: 0,
    goodsList: [],
    orderType: ""
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      orderType: options.orderType
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    let shopList = [];

    if ('buyNow' == that.data.orderType){
      let buyNowInfoMem = wx.getStorageSync('buyNowInfo');
      if (buyNowInfoMem && buyNowInfoMem.shopList) {
        shopList = buyNowInfoMem.shopList
      }
    } else {
      //购物车下单
      let shopCarInfoMem = wx.getStorageSync('shopCarInfo');
      if (shopCarInfoMem && shopCarInfoMem.shopList) {
        // shopList = shopCarInfoMem.shopList
        shopList = shopCarInfoMem.shopList.filter(entity => {
          return entity.active;
        });
      }
    }
    that.setData({
      goodsList : shopList
    })
    that.initGoodsJsonStr();
  },


  createOrder: function(e){
    wx.showLoading();
    let requestUrl = app.globalData.requestUrl;
    let loginToken = app.globalData.token;
    let that = this;
    let remark = '';

    if(e){
      remark = e.detail.value.remark;
    }

    let postData = {
      token: loginToken,
      goodsJsonStr: that.data.goodsJsonStr,
      remark: remark
    }
    wx.request({
      url:  requestUrl + 'api/order/new',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: postData,
      success: (res) => {
        wx.hideLoading();
        wx.redirectTo({
          url: '/pages/order-list/order-list',
        });

        if (!e) {
          that.setData({
            allGoodsPrice: res.data.data.amountTotle,
            allGoodsAndYunPrice: res.data.data.amountLogistics,
          });
          return;
        }
      }
    })
  },

  initGoodsJsonStr(){
    let that = this;
    let goodsList = that.data.goodsList;
    let goodsJsonStr = '[';
    let allGoodsPrice = 0;
    for (let i = 0; i < goodsList.length;i++){
      let carShopBean = goodsList[i];
      
      allGoodsPrice += carShopBean.price * carShopBean.number;

      var goodsJsonStrTmp = '';
      if (i > 0) {
        goodsJsonStrTmp = ",";
      }
      goodsJsonStrTmp += '{"goodsId":' + carShopBean.goodsId + ',"number":' + carShopBean.number + '}';
      goodsJsonStr += goodsJsonStrTmp;
    }
    goodsJsonStr += "]";
    that.setData({
      goodsJsonStr: goodsJsonStr
    })
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