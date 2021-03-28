import Vue from 'vue'
import App from './App.vue'

import router from './router'

import Vuex from 'vuex'
import store from './store'
Vue.use(Vuex)

import "nes.css/css/nes.min.css";

import "./assets/css/global.scss"




Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
