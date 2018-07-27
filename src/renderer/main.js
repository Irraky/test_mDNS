import Vue from 'vue'

// import axios from 'axios'
// import VueSpacebroClient from 'vue-spacebro-client'
// import settings from '@/lib/settings'

import App from './App'
import router from './router'
import store from './store'
var mdns = require('mdns-js')
mdns.excludeInterface('0.0.0.0')
// if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

// Vue.use(VueSpacebroClient, settings.service.spacebro, store)

/* eslint-disable no-new */
var app = new Vue({
  components: { App },
  router,
  store,
  data: function () {
    return {
    }
  },
  created () {
    var browser = mdns.createBrowser()
    var mydata = []
    browser.on('ready', function () {
      browser.discover()
    })
    browser.on('update', function (data) {
      mydata.push(data)
      console.log(mydata)
    })
  },
  template: '<App/>'
}).$mount('#app')

console.log(app)
