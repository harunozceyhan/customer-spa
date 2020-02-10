import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import CustomerList from '../../src/components/container/customer/CustomerList'

const localVue = createLocalVue()
localVue.use(Vuex)

Vue.config.silent = true // suppresses warnings triggered by Vue
Vue.use(Vuetify)

describe('CustomerDetail component unit test', () => {
	let vuetify
	let state
	let getters
	let actions
	let store

	beforeEach(() => {
		vuetify = new Vuetify()

		state = {
			page: {
				tableLoading: false,
				mainList: [
					{
						id: '1166e095-ad7f-4109-be33-aeb439d31b40',
						firstName: 'Test Name',
						lastName: 'Test Last Name',
						gender: 'Man',
						customerLifeTimeValue: 4.5,
						birthday: '1996-10-12',
						lastContact: '2017-06-01T23:28:56.782Z'
					}
				]
			}
		}

		getters = {
			getPage: () => state.page,
			getTableLoading: () => state.getTableLoading
		}

		actions = {
			requestMainListOfPage: () => {}
		}

		store = new Vuex.Store({
			modules: {
				api: {
					state,
					getters,
					actions
				}
			}
		})
	})

	it('renders without crashing', () => {
		mount(CustomerList, { store, localVue, vuetify })
	})

	it('First cell of first row text should be "Test Name"', () => {
		let wrapper = mount(CustomerList, { store, localVue, vuetify })
		expect(wrapper.find('table tbody tr:nth-child(1) td:nth-child(1)').text()).toBe('Test Name')
	})

	it('Second cell of first row text should be "Test Last Name"', () => {
		let wrapper = mount(CustomerList, { store, localVue, vuetify })
		expect(wrapper.find('table tbody tr:nth-child(1) td:nth-child(2)').text()).toBe('Test Last Name')
	})

	it('Third cell of first row text should be "1996-10-12"', () => {
		let wrapper = mount(CustomerList, { store, localVue, vuetify })
		expect(wrapper.find('table tbody tr:nth-child(1) td:nth-child(3)').text()).toBe('1996-10-12')
	})

	it('Fourth cell of first row text should be "Man"', () => {
		let wrapper = mount(CustomerList, { store, localVue, vuetify })
		expect(wrapper.find('table tbody tr:nth-child(1) td:nth-child(4)').text()).toBe('Man')
	})

	it('Fifth cell of first row text should be "2017-06-01 23:28:56"', () => {
		let wrapper = mount(CustomerList, { store, localVue, vuetify })
		expect(wrapper.find('table tbody tr:nth-child(1) td:nth-child(5)').text()).toBe('2017-06-01 23:28:56')
	})

	it('Sixth cell of first row text should be "4.5"', () => {
		let wrapper = mount(CustomerList, { store, localVue, vuetify })
		expect(wrapper.find('table tbody tr:nth-child(1) td:nth-child(6)').text()).toBe('4.5')
	})
})
