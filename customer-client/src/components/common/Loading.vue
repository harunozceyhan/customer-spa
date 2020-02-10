<template>
	<div>
		<v-dialog v-model="getLoading" persistent width="500">
			<v-card>
				<v-card-title>Please Wait...</v-card-title>
				<v-card-text> Please Wait While Request And Response... </v-card-text>
				<v-progress-linear indeterminate height="6" color="secondary"></v-progress-linear>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Loading',
	computed: {
		...mapGetters({
			getLoading: 'getLoading'
		})
	}
}
</script>
