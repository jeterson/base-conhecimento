import 'font-awesome/css/font-awesome.css'

import Vue from 'vue'

import App from './App'

import store from './config/store'

import router from './config/router'

import './config/bootstrap'
import './config/msgs'

Vue.config.productionTip = false

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkpldGVyc29uIE1pcmFuZGEgR29tZXMiLCJlbWFpbCI6ImpldGVyc29uc2lAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0OTAyMTQ2NiwiZXhwIjoxNTQ5MjgwNjY2fQ.DGT8-PZYkBS1PZ2dD66YG0Qml3O2WSvOxwEkB-LO73U'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')