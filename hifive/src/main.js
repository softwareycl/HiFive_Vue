// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './store/index'
import './theme/button.css'
import './theme/slider.css'
import './theme/menu.css'
import './theme/menu-item.css'
import './theme/tabs.css'
import './theme/pagination.css'
import './theme/dropdown.css'
import './theme/dropdown-item.css'
import './theme/dropdown-menu.css'
import './theme/radio.css'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(Vuex)

Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>',
  render: h => h(App)
})
