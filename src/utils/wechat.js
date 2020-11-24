/**
 * interface Options {
 *  title: string, // 分享标题
 *  desc: string, // 分享描述
 *  link: string, // 分享链接
 *  imgUrl: string, // 分享图标
 *  success: function, // 成功回调
 *  cancel: function, // 取消回调
 * }
 */

const doNothing = () => {}
const DEFAULT = {
  title: "长江证券投教作品评选",
  desc: "喜欢别犹豫，快快选出你心中的No.1",
  link: `http://view.horsevision.cn/h5/common/cjzq_vote/dist/#/`,
  imgUrl: "https://view.horsevision.cn/h5/lxy/shareimg/cjzq.jpeg",
  success: doNothing,
  cancel: doNothing,
}

const Wechat = {
  share(options = {}) {

    let merge = Object.assign({}, DEFAULT, options);

    wx.ready(function () {
      console.log(merge, 'merge================')

      // 分享给好友
      wx.onMenuShareAppMessage(merge)


      // 分享到朋友圈
      wx.onMenuShareTimeline(merge)

    })
  },
}

export default Wechat
