import router from '@/plugins/router/router'
import { SET_MAINLIST_OF_PAGE, CLEAR_PAGE_STATE, SET_DETAIL_DATA_STATE } from './mutation-types'

const page = () => ({
	mainList: [],
	detailData: {}
})

export default {
	state: {
		page: page()
	},
	getters: {
		getPage: state => {
			return state.page
		},
		getMainListOfPage: state => {
			return state.page.mainList
		},
		getDetailData: state => {
			return state.page.detailData
		}
	},
	mutations: {
		[CLEAR_PAGE_STATE](state) {
			const initial = page()
			Object.keys(initial).forEach(key => {
				state.page[key] = initial[key]
			})
		},
		[SET_MAINLIST_OF_PAGE](state, payload) {
			state.page.mainList = payload.mainList
		},

		[SET_DETAIL_DATA_STATE](state, payload) {
			state.page.detailData = JSON.parse(JSON.stringify(payload.detailData))
		}
	},
	actions: {
		clearPage({ commit }) {
			commit({ type: CLEAR_PAGE_STATE })
		},
		setDetailDataOfPage({ commit }, detailData) {
			commit({ type: SET_DETAIL_DATA_STATE, detailData: detailData })
		},
		requestMainListOfPage({ commit }, payload) {
			this._vm.axios.get(payload.requestUri, { tableLoading: true }).then(
				response => commit({ type: SET_MAINLIST_OF_PAGE, mainList: response.data }),
				() => {}
			)
		},
		requestPostData({ commit }, payload) {
			this._vm.axios.post(payload.requestUri, payload.data, { loading: true }).then(
				() => {
					this.dispatch('setSuccessAlert', 'Customer Added!')
					commit({ type: SET_DETAIL_DATA_STATE, detailData: {} })
					router.push({ path: 'customer' })
				},
				() => {}
			)
		},
		requestPutData({ commit }, payload) {
			this._vm.axios.put(payload.requestUri + '/' + payload.data.id, payload.data, { loading: true }).then(
				() => {
					this.dispatch('setSuccessAlert', 'Customer Updated!')
					commit({ type: SET_DETAIL_DATA_STATE, detailData: {} })
					router.push({ path: 'customer' })
				},
				() => {}
			)
		},
		requestDeleteData({ commit }, payload) {
			this._vm.axios.delete(payload.requestUri + '/' + payload.id, { loading: true }).then(
				() => {
					this.dispatch('setSuccessAlert', 'Customer Deleted!')
					commit({ type: SET_DETAIL_DATA_STATE, detailData: {} })
					router.push({ path: 'customer' })
				},
				() => {}
			)
		}
	}
}
