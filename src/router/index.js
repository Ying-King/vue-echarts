import Vue from "vue";
import VueRouter from "vue-router";
import routes from './route'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
       return savedPosition;
    } else {
       return {x: 0, y: 0};
    }
 }
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) { //判断是否有标题
    document.title = to.meta.title
  }
  next();
});

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

export default router;
