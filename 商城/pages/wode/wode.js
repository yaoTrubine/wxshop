var app = getApp();

Page({
  	data: {
  		userInfo: {},
  	},
  	onLoad: function() {
  		var that = this;
  		wx.login({
        success: function (res) {
          if(res.code){
            that.setData({
              wxcode : res.code
            });
            wx.getUserInfo({
              success: function (res) {
                that.setData({
                  userInfo: res.userInfo,
                  encryptedData: res.encryptedData,
                  iv: res.iv
                })
                wx.request({
                  url: 'http://106.14.159.161:8000/api/wx/login',
                  data: {
                    code: that.data.wxcode,
                    encryptedData: that.data.encryptedData,
                    iv : that.data.iv
                  },
                  method: 'POST',
                  success: function(res){
                    console.log(res);
                    return;
                  }
                })
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
          
        }
      });
  	},
    getPhoneNumber:function(e) {
      let that = this;
      console.log(that.data);
    }
})