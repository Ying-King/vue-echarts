import {$get, $post} from './axios'

export default {
  install(Vue){
    Vue.prototype.$get = $get
    Vue.prototype.$post = $post
  },
}