import Vue from 'vue'

// import axios from 'axios'
// import VueSpacebroClient from 'vue-spacebro-client'
// import settings from '@/lib/settings'

import App from './App'
import router from './router'
import store from './store'
import mdns from 'mdns-js'
import ipc from 'electron-better-ipc'
// if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

var browser = mdns.createBrowser()

browser.on('ready', function () {
  browser.discover()
  ipc.send('get-data', 'coin')
})

browser.on('update', function (data) {
  console.log('data:', data)
  ipc.send('getdata', data)
})

/* eslint-disable no-new */
var app = new Vue({
  components: { App },
  router,
  store,
  data: function () {
    return {
    }
  },
  template: '<App/>'
}).$mount('#app')

console.log(app)
