import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.use(Vuex)

const Signup = require('../src/pages/Signup').default;
const Login = require('../src/pages/Login').default;
const Dashboard = require('../src/pages/Dashboard').default;
const Settings = require('../src/pages/Settings').default;
const PasswordReset = require('../src/pages/PasswordReset').default;
const Tickets = require('../src/pages/Tickets').default;
const TicketDetail = require('../src/pages/TicketDetail').default;

const UserStore = require('../src/store/user').default;

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/password/reset', name: 'password_reset', component: PasswordReset },
  { path: '/dashboard', name: 'dashboard', component: Dashboard },
  { path: '/settings', name: 'settings', component: Settings },
  { path: '/tickets', name: 'tickets', component: Tickets },
  { path: '/tickets/:id', name: 'tickets_details', component: TicketDetail }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (['login', 'signup', 'password_reset'].indexOf(to.name) == -1 && localStorage.getItem('user') == null) {
    next({name: 'login'});
  }

  next();
})

Vue.prototype.$store = new Vuex.Store({
  modules: {
    UserStore
  }
})

const store = Vue.prototype.$store;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
