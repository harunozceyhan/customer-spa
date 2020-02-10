import Vue from 'vue'
import { SET_MAINLIST_OF_PAGE, CLEAR_PAGE_STATE, SET_DETAIL_DATA_STATE } from './mutation-types'

const page = () => ({
	mainList: [],
	pageSize: 5,
	totalElements: 0,
	pageNumber: 0,
	detailData: {}
})

export default {
	state: {
		page: page(),
		eventHub: new Vue()
	},
	getters: {
		getPage: state => {
			return state.page
		},
		getMainListOfPage: state => {
			return state.page.mainList
		},
		getEventHub: state => {
			return state.eventHub
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
			state.page.pageSize = payload.pageSize
			state.page.totalElements = payload.totalElements
			state.page.pageNumber = payload.pageNumber
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
		// eslint-disable-next-line no-unused-vars
		requestPostMainOfPage({ commit }, payload) {
			this._vm.axios.post(payload.requestUri, payload.data, { loading: true }).then(
				response => {
					commit({ type: SET_DETAIL_DATA_STATE, detailData: response.data })
					this.dispatch('setSuccessAlert', 'Customer Added!')
					this.eventHub.$emit('refreshPageList')
				},
				() => {}
			)
		},
		// eslint-disable-next-line no-unused-vars
		requestPutMainOfPage({ commit }, payload) {
			this._vm.axios.put(payload.requestUri + '/' + payload.data.id, payload.data, { loading: true }).then(
				() => {
					this.dispatch('setSuccessAlert', 'Customer Updated!')
					this.eventHub.$emit('refreshPageList')
				},
				() => {}
			)
		},
		// eslint-disable-next-line no-unused-vars
		requestDeleteMainOfPage({ commit }, payload) {
			this._vm.axios.delete(payload.requestUri + '/' + payload.data.id, { loading: true }).then(
				() => {
					this.dispatch('setSuccessAlert', 'Customer Deleted!')
					this.eventHub.$emit('refreshPageList')
				},
				() => {}
			)
		}
	}
}
