var WxAutoImage = require('../../js/detailImage.js');
var app = getApp();

Page({
    data: {
        imgUrls: [
            '../../image/swiper1.jpg',
            '../../image/swiper1.jpg',
            '../../image/swiper1.jpg'
        ],
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1200,
        id : [],
        title : '',
        goodsDetail: {},
        hasMoreSelect: false,
        selectSize: "选择：",
        selectSizePrice: 0,
        shopNum: 0,
        hideShopPopup: true,
        buyNumber: 0,
        buyNumMin: 1,
        buyNumMax: 0,

        propertyChildIds: "",
        propertyChildNames: "",
        canSubmit: false, //  选中规格尺寸时候是否允许加入购物车
        shopCarInfo: {},
        shopType: "addShopCar",//购物类型，加入购物车或立即购买，默认为加入购物车
    },

    cusImageLoad: function(e){
        var that = this;
        that.setData(WxAutoImage.wxAutoImageCal(e));
    },
    onLoad: function(option){
      let that = this;
        wx.request({
          url: 'http://localhost:8000/api/products/'+option.id,
          success: function(res){
            that.data.goodsDetail = res.data.product;
            that.setData({
              goodsDetail : res.data.product,
              selectSizePrice : res.data.product.price,
              buyNumMax : res.data.product.amount,
              buyNumber: (res.data.product.amount>0) ? 1 : 0
            })
          }
        })
        console.log(that.data);
    },
    goShopCar:function(){
      wx.reLaunch({
        url: 'pages/xiaoxi/xiaoxi',
      })
    },
    toAddShopCar:function(){
        this.setData({
          shopType: 'addShopCar'
        });
        this.bindGuiGeTap();
    },
    tobuy:function(){
        this.setData({
          shopType: 'tobuy'
        });
        this.bindGuiGeTap();
    },
    bindGuiGeTap(){
      this.setData({
        hideShopPopup : false
      })
    },
    closePopupTap(){
      this.setData({
        hideShopPopup: true
      })
    },
    numJianTap(){
      if (this.data.buyNumber > this.data.buyNumMin){
        let currentNum = this.data.buyNumber;
        currentNum --;
        this.setData({
          buyNumber : currentNum
        })
      }
    },
    numJiaTap(){
      if(this.data.buyNumber < this.data.buyNumMax){
        let currentNum = this.data.buyNumber;
        currentNum ++;
        this.setData({
          buyNumber : currentNum
        })
      }
    },
    addShopCar: function(){
        if(this.data.buyNumber < 1){
          wx.showModal({
            title: '提示',
            content: '购买数量不能为0',
            showCancel:false
          })
          return;
        }
        
    },
    buyNow: function(){

    }
})
