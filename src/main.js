// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'  
import store from './store/index.js'  
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/js/bootbox.js'
import 'animate.css/animate.min.css'
import 'bootstrap-table-develop/dist/bootstrap-table.css'
import 'bootstrap-table-develop/dist/bootstrap-table.js'
import 'bootstrap-table-develop/dist/locale/bootstrap-table-zh-CN.js'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueAxios,axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,

  components: { App },
  template: '<App/>'
})
