import Vue from 'vue'
import App from './containers/App.vue'
import css from 'bootstrap'
// import * as component from './register/component'

Vue.config.productionTip = false;

// Vue.component('menu-items', require('./components/Menu.vue').default)
Vue.component('menu-bar', require('./components/MenuBar.vue').default)
Vue.component('icon', require('./components/Icon.vue').default)
Vue.component('dtitle', require('./components/Title.vue').default);
Vue.component('navigation', require('./components/Navigation.vue').default);
// require('bootstrap/dist/css/bootstrap.css')
require('prayer-times')

new Vue({
  el: '#app',
  render: h => h(App)
})
