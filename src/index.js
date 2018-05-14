import Vue from 'vue'
import App from './containers/App.vue'
import css from 'bootstrap'
import VueRouter from 'vue-router';
import routes from './routes'

Vue.config.productionTip = false;

// ##### COMPONENT ##### \\
Vue.component('menu-bar', require('./components/MenuBar.vue').default)
Vue.component('icon', require('./components/Icon.vue').default)
Vue.component('dtitle', require('./components/Title.vue').default);
Vue.component('navigation', require('./components/Navigation.vue').default);


// ##### PLUGIN ##### \\
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
