<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import loadScript from "utils/loadScript";
export default {
  mounted() {
    this.wxShare();
  },
  methods: {
    wxShare() {
      let API_WX_CONFIG =
        "http://view.horsevision.cn/shengangdati/web/index.php?r=home-api/get-share-config";
      loadScript(`${API_WX_CONFIG}&url=${encodeURIComponent(location.href)}`)
        .then(() => {
          try {
            console.log("调用config成功----------");
            // Wechat.share();
            wx.ready(function() {
              // console.log(1111)
            });
          } catch (err) {
            throw new Error(err);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

html,
body {
  height: 100%;
}
</style>
