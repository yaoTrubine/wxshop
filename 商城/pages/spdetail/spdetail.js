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
        iscollect: true,
        id : [],
        title : ''
    },
    collect: function(){
        this.setData({
            iscollect: !this.data.iscollect
        })
    },
    cusImageLoad: function(e){
        var that = this;
        that.setData(WxAutoImage.wxAutoImageCal(e));
    },
    onLoad: function(option){
      let that = this;
      wx.request({
        url: 'http://localhost:3000/posts/'+option.id,
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          that.setData({
            'post': res.data,
            id : res.data.id,
            title : res.data.title
          })
        }
      })
    },

    addCart(){
      var that = this;
      wx.setStorage({
        key: that.data.id,
        data: that.data.title,
      })
    }
})
