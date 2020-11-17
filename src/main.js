/* eslint-disable */
import Vue from 'vue';
import App from './App.vue';
import store from './store'
import AnchoredHead from './plugin/anchoredHead.js'

Vue.use(AnchoredHead)
Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
