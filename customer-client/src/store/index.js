import Vue from 'vue'
import Vuex from 'vuex'
import api from './modules/api'
import common from './modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		api,
		common
	}
})
