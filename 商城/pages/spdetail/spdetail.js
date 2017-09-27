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
      let requestUrl = app.globalData.requestUrl;
      //获取购物车数据
      wx.getStorage({
        key: 'shopCarInfo',
        success: function (res) {
          that.setData({
            shopCarInfo: res.data,
            shopNum: res.data.shopNum
          });
        }
      })

        wx.request({
          url: requestUrl + 'api/products/'+option.id,
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
        url: '/pages/xiaoxi/xiaoxi',
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
    /*
    **加入购物车
    */
    addShopCar: function(){
        if(this.data.buyNumber < 1){
          wx.showModal({
            title: '提示',
            content: '购买数量不能为0',
            showCancel:false
          })
          return;
        }
        //构建购物车
        let shopCarInfo = this.buildShopCarInfo();
        this.setData({
          shopCarInfo: shopCarInfo,
          shopNum: shopCarInfo.shopNum
        })
        wx.setStorage({
          key: 'shopCarInfo',
          data: shopCarInfo,
        })
        this.closePopupTap();
        wx.showToast({
          title: '加入购物车成功',
          icon: 'success',
          duration: 2000
        })
    },
    /*
    **立即购买
    */
    buyNow: function(){
      if (this.data.buyNumber < 1) {
        wx.showModal({
          title: '提示',
          content: '购买数量不能为0',
          showCancel: false
        })
        return;
      }
      let buyNowInfo = this.buildBuyNowInfo();
      wx.setStorage({
        key: 'buyNowInfo',
        data: buyNowInfo,
      });
      this.closePopupTap();
      wx.navigateTo({
        url: '/pages/pay/pay?orderType=buyNow',
      })
    },


    buildShopCarInfo: function(){
      let shopCarMap = {};
      shopCarMap.goodsId = this.data.goodsDetail._id;
      shopCarMap.pic = this.data.goodsDetail.images;
      shopCarMap.name = this.data.goodsDetail.name;
      shopCarMap.price = this.data.goodsDetail.price;
      shopCarMap.number = this.data.buyNumber;
      shopCarMap.active = true;

      let shopCarInfo = this.data.shopCarInfo;
      if(!shopCarInfo.shopNum){
        shopCarInfo.shopNum = 0;
      }
      if (!shopCarInfo.shopList){
        shopCarInfo.shopList = [];
      }

      let hasSameGoodsIndex = -1;
      for (let i = 0; i < shopCarInfo.shopList.length; i++) {
        let tmpShopCarMap = shopCarInfo.shopList[i];
        if (tmpShopCarMap.goodsId == shopCarMap.goodsId) {
          hasSameGoodsIndex = i;
          shopCarMap.number = shopCarMap.number + tmpShopCarMap.number;
          break;
        }
      }
      shopCarInfo.shopNum = shopCarInfo.shopNum + this.data.buyNumber;
      if (hasSameGoodsIndex > -1) {
        shopCarInfo.shopList.splice(hasSameGoodsIndex, 1, shopCarMap);
      } else {
        shopCarInfo.shopList.push(shopCarMap);
      }
      return shopCarInfo;
    },

    buildBuyNowInfo:function(){
      let shopCarMap = {};
      shopCarMap.goodsId = this.data.goodsDetail._id;
      shopCarMap.pic = this.data.goodsDetail.images;
      shopCarMap.name = this.data.goodsDetail.name;
      shopCarMap.price = this.data.goodsDetail.price;
      shopCarMap.number = this.data.buyNumber;
      shopCarMap.active = true;
      
      let buyNowInfo = {};
      if (!buyNowInfo.shopNum) {
        buyNowInfo.shopNum = 0;
      }
      if (!buyNowInfo.shopList) {
        buyNowInfo.shopList = [];
      }
      buyNowInfo.shopList.push(shopCarMap);

      return buyNowInfo;
    }


})
