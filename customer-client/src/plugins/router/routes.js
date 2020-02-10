import CustomerList from '@/components/container/customer/CustomerList'
import CustomerDetail from '@/components/container/customer/CustomerDetail'

const routes = [
	{ path: '*', redirect: '/customer' },
	{ path: '/customer', component: CustomerList },
	{ path: '/customer-detail', component: CustomerDetail }
]

export default routes
