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
				response => commit({ type: SET_MAINLIST_OF_PAGE, mainList: response.data._embedded[payload.responseKey], pageSize: response.data.page.size, totalElements: response.data.page.totalElements, pageNumber: response.data.page.number }),
				() => {}
			)
		},
		requestPostMainOfPage({ commit, rootState }, payload) {
			this._vm.axios.post(payload.requestUri, payload.data, { loading: true }).then(
				response => {
					commit({ type: SET_DETAIL_DATA_STATE, detailData: response.data })
					this.dispatch('setSuccessAlert', 'Customer Added!')
					rootState.common.eventHub.$emit('refreshPageList')
				},
				() => {}
			)
		},
		requestPutMainOfPage({ commit, rootState }, payload) {
			this._vm.axios.put(payload.requestUri + '/' + payload.data.id, payload.data, { loading: true }).then(
				response => {
					commit({ type: SET_DETAIL_DATA_STATE, detailData: response.data })
					this.dispatch('setSuccessAlert', 'Customer Updated!')
					rootState.common.eventHub.$emit('refreshPageList')
				},
				() => {}
			)
		}
	}
}
