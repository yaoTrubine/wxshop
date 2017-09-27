App({
    onLaunch: function () {
      //  获取商城名称
      this.registerUser();
    },
    // login : function () {
    //   var that = this;
    //   var token = that.globalData.token;
    //   if (token) {
    //     wx.request({
    //       url: 'http://localhost:8000/api/wx/login',
    //       data: {
    //         token: token
    //       },
    //       success: function (res) {
    //         if (res.data.code != 0) {
    //           that.globalData.token = null;
    //           that.login();
    //         }
    //       }
    //     })
    //     return;
    //   }
    //   wx.login({
    //     success: function (res) {
    //       wx.request({
    //         url: 'http://localhost:8000/api/wx/login',
    //         data: {
    //           code: res.code
    //         },
    //         success: function(res) {
    //           console.log(res);
    //           if (res.data.code == 10000) {
    //             // 去注册
    //             that.registerUser();
    //             return;
    //           }
    //           if (res.data.code != 0) {
    //             // 登录错误
    //             wx.hideLoading();
    //             wx.showModal({
    //               title: '提示',
    //               content: '无法登录，请重试',
    //               showCancel:false
    //             })
    //             return;
    //           }
    //           //console.log(res.data.data.token)
    //           that.globalData.token = res.data.data.token;
    //         }
    //       })
    //     }
    //   })
    // },
    registerUser: function () {
      var that = this;
      wx.login({
        success: function (res) {
            let code = res.code
            wx.getUserInfo({
              success: function (res) {
                wx.request({
                  url: 'http://localhost:8000/api/wx/login',
                  data: {
                    code: code,
                    encryptedData: res.encryptedData,
                    iv : res.iv
                  },
                  method: 'POST',
                  success: function(res){
                    console.log(res);
                    wx.hideLoading();
                    that.globalData.token = res.data.user.openId;
                    return;
                  }
                })
              }
            })
          } 
      });
    },
   
    globalData:{
      requestUrl: 'https://huikanxi.flhome.cn/'
    }
    // 根据自己需要修改下单时候的模板消息内容设置，可增加关闭订单、收货时候模板消息提醒
  })