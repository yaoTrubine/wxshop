var WxAutoImage = require('../../js/wxAutoImageCal.js');
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
        categories: [
          { id: 0, name: "全部" },
          { id: 1, name: "分类一" },
          { id: 2, name: "分类二" }],
        products: [],
        loadingMoreHidden: true,
        activeCategoryId: 0,
        
        iconArray: [
            {
                "iconUrl": '../../image/icon-qiandao.png',
                "iconText": '签到'
            },
            {
                "iconUrl": '../../image/icon-fujin.png',
                "iconText": '附近'
            },
            {
                "iconUrl": '../../image/icon-zhanhui.png',
                "iconText": '游展'
            },
            {
                "iconUrl": '../../image/icon-fuli.png',
                "iconText": '福利'
            },
            {
                "iconUrl": '../../image/icon-muma.png',
                "iconText": '玩乐'
            },
            {
                "iconUrl": '../../image/icon-xingxing.png',
                "iconText": '周边'
            },
            {
                "iconUrl": '../../image/icon-tiyu.png',
                "iconText": '体育'
            },
            {
                "iconUrl": '../../image/icon-qinzi.png',
                "iconText": '亲子'
            }
        ],
        itemArray: [
            {
                "itemUrl": '../../image/huaju.jpeg',
                "itemText": '11月20日话剧《风声》'
            },
            {
                "itemUrl": '../../image/huaju.jpeg',
                "itemText": '11月20日话剧《原野》'
            },
            {
                "itemUrl": '../../image/huaju.jpeg',
                "itemText": '11月28日“夜店”演唱会'
            },
        ]
    },
    tabClick : function(e){
      let categroyId = e.currentTarget.dataset.name;
     
      this.setData({
        activeCategoryId: categroyId
      });
      this.getProductsList(this.data.activeCategoryId);
    },
    onLoad : function(){
          this.setData({
            activeCategoryId: '全部',
          })
          this.getProductsList('全部');
    },

    //获取不同分类的产品
    getProductsList: function(categroyId){
      let that = this;
      let requestUrl = app.globalData.requestUrl;
      if (categroyId == '全部'){
        categroyId = '';
      }
      
      wx.request({
        url: requestUrl + 'api/products/category/category',
        data:{
          category: categroyId
        },
        success : function(res){
          that.setData({
            products: [],
            loadingMoreHidden: true
          });
          let products = [];
          if(res.data.products.length == 0 || res.statusCode != 200){
            that.setData({
              loadingMoreHidden: false
            })
          }
          res.data.products.map( product => {
            products.push(product);
          })
          that.setData({
              products: products
          })
        }
      })
    },
    //商品跳转
    toDetailsTap: function(e){
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/spdetail/spdetail?id='+id,
      })
    },
    cusImageLoad: function(e){
        var that = this;
        that.setData(WxAutoImage.wxAutoImageCal(e));
    }
})