import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import request from "@/request";
import "babel-polyfill";
import "./utils/registerGlobalComponents";
// import Vconsole from 'vconsole';
// process.env.NODE_ENV === 'development' && new Vconsole();

import echarts from "echarts";
import 'echarts-liquidfill';
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;
Vue.use(request);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
