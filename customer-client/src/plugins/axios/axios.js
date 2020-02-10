'use strict'
import Vue from 'vue'
import axios from 'axios'
import { successResponseHandler, errorResponseHandler } from './response-handler'
import { requestConfig, requestConfigError } from './request-handler'

let _axios = axios.create({
	baseURL: process.env.VUE_APP_ROOT_API
})

_axios.interceptors.request.use(requestConfig, requestConfigError)
_axios.interceptors.response.use(successResponseHandler, errorResponseHandler)

Plugin.install = function(Vue) {
	Object.defineProperties(Vue.prototype, {
		axios: {
			get() {
				return _axios
			}
		}
	})
}

Vue.use(Plugin)

export default Plugin
