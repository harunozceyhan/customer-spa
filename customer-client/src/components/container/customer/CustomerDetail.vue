<template>
	<v-container fluid>
		<v-card>
			<v-toolbar dark color="header">
				<v-icon class="mx-2">mdi-pencil</v-icon>
				<v-toolbar-title>{{ getDetailData.id === undefined ? 'New Customer' : getDetailData.firstName + ' ' + getDetailData.lastName }}</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-btn icon dark class="mx-1" @click="submit" ref="add"> <v-icon>save</v-icon> </v-btn>
				<v-btn icon dark class="mx-1" @click="sureModel = { show: true, data: getDetailData.id }" v-if="getDetailData.id !== undefined"> <v-icon>delete</v-icon> </v-btn>
				<v-btn icon dark class="mx-1" @click="detailData = JSON.parse(JSON.stringify(getDetailData))"> <v-icon>format_clear</v-icon> </v-btn>
				<v-btn icon dark @click="$router.push({ path: 'customer' })"> <v-icon>close</v-icon> </v-btn>
			</v-toolbar>
			<v-card-text>
				<v-form ref="form" lazy-validation>
					<v-container grid-list-md pb-0>
						<v-layout row wrap>
							<v-flex> </v-flex>
						</v-layout>
					</v-container>
				</v-form>
			</v-card-text>
		</v-card>
		<sure-model :show="sureModel.show" @hide="sureModel.show = false" @apply="requestDeleteData({ requestUri: '', id: sureModel.data })" />
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SureModel from '@/components/common/Sure'

export default {
	name: 'CustomerDetail',
	components: {
		'sure-model': SureModel
	},
	data: () => ({
		sureModel: { show: false, data: null },
		detailData: {}
	}),
	computed: {
		...mapGetters(['getDetailData', 'getLoading'])
	},
	methods: {
		...mapActions(['requestPostData', 'requestPutData', 'requestDeleteData']),
		submit() {
			this.requestPostData({ requestUri: '', data: this.getDetailData })
		}
	},
	mounted() {
		this.detailData = JSON.parse(JSON.stringify(this.getDetailData))
	}
}
</script>
