import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import themes from './theme'

Vue.use(Vuetify)

const opts = {
	theme: {
		themes
	},
	icons: {
		iconfont: 'mdi'
	}
}

export default new Vuetify(opts)
