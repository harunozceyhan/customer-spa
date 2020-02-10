<template>
	<!-- App.vue -->
	<v-app style="height: 100%">
		<v-app-bar app clipped-left clipped-right color="app" dark>
			<div style="width: 260px">
				<v-img src="@/assets/mapp.png" max-width="220" max-height="50" style="margin-left: 16px"></v-img>
			</div>
		</v-app-bar>
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
