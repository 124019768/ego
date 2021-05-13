import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/less/reset.less'
import api from './api'
import  i18n from  './lang/index'






Vue.prototype.$api=api
Vue.config.productionTip = false


let user=localStorage.getItem('userToken')
if(user){
  store.commit('loginModule/setUser',JSON.parse(user))
}

new Vue({
  router,
  store,
  i18n,
  
  render: h => h(App)
}).$mount('#app')
