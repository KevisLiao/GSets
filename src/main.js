import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import axios from './utils/request'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

// Vue.prototype.$axios = axios;  

Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  Vuetify,
  render: h => h(App)
}).$mount('#app')
