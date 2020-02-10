import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'vue-moment'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import CustomerDetail from '../../src/components/container/customer/CustomerDetail'
import vuetify from 'vuetify'

Vue.use(vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(moment)

describe('CustomerDetail component unit test', () => {
	let state
	let getters
	let store

	beforeEach(() => {
		state = {
			detailData: {
				id: '1166e095-ad7f-4109-be33-aeb439d31b40',
				firstName: 'Test Name',
				lastName: 'Test Last Name',
				gender: 'Man',
				customerLifeTimeValue: 4.5,
				birthday: '1996-10-12',
				lastContact: '2017-06-01T23:28:56.782Z'
			}
		}

		getters = {
			getDetailData: () => state.detailData
		}

		store = new Vuex.Store({
			modules: {
				api: {
					state,
					getters
				}
			}
		})
	})

	it('renders without crashing', () => {
		shallowMount(CustomerDetail, { store, localVue, moment })
	})

	it('vm with key firstName value should be "Test Name"', () => {
		let wrapper = shallowMount(CustomerDetail, { store, localVue, moment })
		expect(wrapper.vm.detailData.firstName).toBe('Test Name')
	})

	it('vm with key lastName value should be "Test Last Name"', () => {
		let wrapper = shallowMount(CustomerDetail, { store, localVue, moment })
		expect(wrapper.vm.detailData.lastName).toBe('Test Last Name')
	})

	it('vm with key birthday value should be "1996-10-12"', () => {
		let wrapper = shallowMount(CustomerDetail, { store, localVue, moment })
		expect(wrapper.vm.detailData.birthday).toBe('1996-10-12')
	})

	it('vm with key customerLifeTimeValue value should be "4.5"', () => {
		let wrapper = shallowMount(CustomerDetail, { store, localVue, moment })
		expect(wrapper.vm.detailData.customerLifeTimeValue).toBe(4.5)
	})
})
