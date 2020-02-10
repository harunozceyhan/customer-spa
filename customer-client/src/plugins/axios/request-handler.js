import store from '@/store'

/*
    Creates a request config that takes loading values as parameter and 
    updates store state with this parameters to show loading bars
*/

export const requestConfig = config => {
	if (config.loading) store.dispatch('setLoading', true)
	if (config.tableLoading) store.dispatch('setTableLoading', true)
	return config
}

export const requestConfigError = error => {
	return Promise.reject(error)
}
