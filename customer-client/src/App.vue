<template>
	<!-- App.vue -->
	<v-app style="height: 100%">
		<v-app-bar app clipped-left clipped-right color="app">
			<div style="width: 260px">
				<router-link :to="{ path: '/customer' }" replace><v-img src="@/assets/mapp.png" max-width="220" max-height="50" style="margin-left: 16px"></v-img></router-link>
			</div>
			<v-toolbar-title>Customer Single Page Application</v-toolbar-title>
		</v-app-bar>
		<v-content style="height: 100%">
			<router-view style="overflow-y: auto; height: 100%" id="router-view"></router-view>
		</v-content>
		<s-alert />
		<s-loading />
	</v-app>
</template>

<script>
import Alert from './components/common/Alert'
import Loading from './components/common/Loading'

export default {
	name: 'App',
	components: {
		's-loading': Loading,
		's-alert': Alert
	}
}
</script>
