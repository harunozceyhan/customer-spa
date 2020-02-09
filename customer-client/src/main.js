import Vue from 'vue'
import moment from 'vue-moment'
import App from './App.vue'
import vuetify from './plugins/vuetify/vuetify'

Vue.config.productionTip = false
Vue.use(moment)

new Vue({
	vuetify,
	moment,
	render: h => h(App)
}).$mount('#app')
