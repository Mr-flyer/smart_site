import Vue from "vue";
import App from "./App.vue";
import axios from 'axios';
import router from "./router";
import store from "./store";
import echarts from "echarts";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import {Message} from 'element-ui';
import request from './utils/js/request';

Vue.use(ElementUI)
Vue.prototype.$message = Message;
Vue.prototype.$echarts = echarts;
Vue.prototype.$http = request;
Vue.config.productionTip = false;

/********
 *** axios配置：发送请求前拦截
*********/
axios.defaults.timeout = 8000; //设定超时时间
axios.defaults.withCredentials = true;//让ajax携带cookie
axios.interceptors.request.use(config => {
  return config
  }, error => {
    Message({
      type: 'error',
      message: '数据链接异常，请刷新重试！'
    })
    return Promise.reject(error)
})
/********
*** axios配置：请求后响应的拦截
*********/
axios.defaults.baseURL = 'http://192.168.101.47:8000/';
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // 请求超时，重新请求
    var config = error.config;
    if(!config || !config.retry) {
      return Promise.reject(error)
    };
    if(error.response){
      if(error.response.status == 400 || error.response.status == 403 || error.response.status == 404){
        return Promise.reject(error);
      }
    }
    config.__retryCount = config.__retryCount || 0;
    if(config.__retryCount >= config.retry) {
      Message({
        type: 'error',
        message: '数据链接异常，请刷新重试！'
      })
      return Promise.reject(error);
    }
    config.__retryCount += 1;
    var backoff = new Promise(function(resolve) {
      setTimeout(function() {
          resolve();
      }, config.retryDelay || 1);
    });
    return backoff.then(function() {
      return axios(config);
    });
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
