import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify/vuetify'
import store from './store'
import router from './plugins/router/router'
import moment from 'vue-moment'

Vue.config.productionTip = false
Vue.use(moment)

new Vue({
	vuetify,
	moment,
	store,
	router,
	render: h => h(App)
}).$mount('#app')
