import wx from 'weixin-js-sdk'

export default function (flaunt) {
  this.$Axios.post(this.$baseUrl.base + this.$baseUrl.wxConfig, {
    url: window.location.href.split('#')[0]
  }).then(res => {
    console.log(res)
    var appId = res.data.body.appid;
    var noncestr = res.data.body.noncestr;
    var timestamp = res.data.body.timestamp;
    var signature = res.data.body.signature;
    wx.config({
      debug: false, //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: appId, //必填，公众号的唯一标识
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: noncestr, //必填，生成签名的随机串
      signature: signature, // 必填，签名，见附录1
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] //必填，需要使用的JS接口列表，所有JS接口列表 见附录2
    });

    wx.error(function (res) {
      console.log(JSON.stringify(res) + "      微信注册错误")
    })
    wx.ready(function () {
      console.log("   进入   微信ready")
      wx.checkJsApi({
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
        success: function (res) {
          console.log(JSON.stringify(res) + "      微信注册成功")
        }
      })

      //  朋友
      wx.onMenuShareAppMessage({
        title: this.$handler.getItem('user_name') + '等你挑战', // 分享标题
        desc: '乐拼王者，等你来挑战！',
        link: window.location.href, // 分享链接
        imgUrl: this.$baseUrl.shapeImg, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          flaunt = 0
        },
        cancel: function () {
          flaunt = 0
          // 用户取消分享后执行的回调函数
        }
      })
      //  朋友圈
      wx.onMenuShareTimeline({
        title: this.$handler.getItem('user_name') + '等你挑战', // 分享标题
        desc: '乐拼王者，等你来挑战！',
        link: window.location.href, // 分享链接
        imgUrl: this.$baseUrl.shapeImg, // 分享图标
        success: function () {
          flaunt = 0
        },
        cancel: function () {
          flaunt = 0
        }
      })
    })
  })
}
