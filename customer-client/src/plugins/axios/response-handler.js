import store from '@/store'

export const successResponseHandler = response => {
	if (response.config.loading) store.dispatch('setLoading', false)
	if (response.config.tableLoading) store.dispatch('setTableLoading', false)
	return response
}

const getMessageOfResponseStatus = status => {
	switch (status) {
		case 400: // Bad Request
			return 'Malformed Request Syntax! Please Fill Required Fields And Try Again'
		case 404: // Not Found
			return 'Resource Not Found'
		case 405: // Method Not Allowed
			return 'This Request is Rejected by the Server'
		case 500: // Internal Server Error
			return 'Unexpected Error Occured on Server'
		default:
			return 'Unknown Error Occured on Server'
	}
}

export const errorResponseHandler = error => {
	if (error.config.loading) store.dispatch('setLoading', false)
	if (error.config.tableLoading) store.dispatch('setTableLoading', false)
	store.dispatch('setErrorAlert', getMessageOfResponseStatus(error.response.status) + '!')
	return Promise.reject(error)
}
