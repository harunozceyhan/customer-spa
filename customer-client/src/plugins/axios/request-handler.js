import store from '@/store'

export const requestConfig = config => {
	if (config.loading) store.dispatch('setLoading', true)
	if (config.tableLoading) store.dispatch('setTableLoading', true)
	return config
}

export const requestConfigError = error => {
	return Promise.reject(error)
}
