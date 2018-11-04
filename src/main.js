// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import MyBread from './components/my-bread.vue'
import moment from 'moment'
import HttpTool from './plugins/http'
import './assets/css/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(HttpTool);
/* eslint-disable no-new */
Vue.filter('fmtDate',function(v){
  return moment(v).format('YYYY-MM-DD')
})
Vue.component('my-bread',MyBread )
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
