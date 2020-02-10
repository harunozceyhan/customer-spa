<template>
	<v-container fluid>
		<v-card>
			<v-toolbar dark color="header">
				<v-icon class="mx-2">mdi-pencil</v-icon>
				<v-toolbar-title>{{ getDetailData.id === undefined ? 'New Customer' : getDetailData.firstName + ' ' + getDetailData.lastName }}</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-btn icon dark class="mx-1" @click="submit" ref="add"> <v-icon>save</v-icon> </v-btn>
				<v-btn icon dark class="mx-1" @click="sureModel = { show: true, data: getDetailData.id }" v-if="getDetailData.id !== undefined"> <v-icon>delete</v-icon> </v-btn>
				<v-btn icon dark class="mx-1" @click="setDetailData()"> <v-icon>format_clear</v-icon> </v-btn>
				<v-btn icon dark @click="$router.push({ path: 'customer' })"> <v-icon>close</v-icon> </v-btn>
			</v-toolbar>
			<v-card-text>
				<v-form ref="form" lazy-validation>
					<v-container grid-list-md pb-0>
						<v-layout row wrap>
							<v-flex class="xs12 sm12 md12 lg12">
								<v-text-field type="text" v-model="detailData.firstName" label="First Name" :rules="[v => !!v || 'Required Field!', v => !v || v.length <= 40 || 'Maximum 40 Characters Allowed']" required maxLength="40" outlined dense></v-text-field>
							</v-flex>
							<v-flex class="xs12 sm12 md12 lg12">
								<v-text-field type="text" v-model="detailData.lastName" label="Last Name" :rules="[v => !!v || 'Required Field!', v => !v || v.length <= 40 || 'Maximum 40 Characters Allowed']" required maxLength="40" outlined dense></v-text-field>
							</v-flex>
							<v-flex class="xs12 sm12 md12 lg12">
								<v-menu :close-on-content-click="false" v-model="pickers.birthdayPickerOpened" :nudge-right="40" transition="scale-transition" offset-y max-width="290px" min-width="290px">
									<template v-slot:activator="{ on }"> <v-text-field slot="activator" v-model="detailData.birthday" label="Birthday" prepend-inner-icon="event" clearable readonly :rules="[v => !!v || 'Required Field']" v-on="on" dense outlined></v-text-field> </template>
									<v-date-picker :value="detailData.birthday" @input="onBirthdayDateSelected($event)" :max="new Date().toISOString().substr(0, 10)"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex class="xs12 sm12 md12 lg12">
								<v-combobox v-model="detailData.gender" :items="genders" label="Select Gender..." required :rules="[v => !!v || 'Required Field!']" outlined dense></v-combobox>
							</v-flex>
							<v-flex class="xs6 sm6 md6 lg6">
								<v-menu :close-on-content-click="false" v-model="pickers.lastContactDatePickerOpened" :nudge-right="40" transition="scale-transition" offset-y max-width="290px" min-width="290px">
									<template v-slot:activator="{ on }"> <v-text-field slot="activator" :value="detailData.lastContact === undefined ? '' : detailData.lastContact.split('T')[0]" label="Last Contact Date" prepend-inner-icon="event" clearable readonly :rules="[v => !!v || 'Required Field']" v-on="on" dense outlined></v-text-field> </template>
									<v-date-picker :value="detailData.lastContact === undefined ? null : detailData.lastContact.split('T')[0]" @input="onLastContactDateSelected($event)" :max="new Date().toISOString().substr(0, 10)"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex class="xs6 sm6 md6 lg6">
								<v-menu v-model="pickers.lastContactTimePickerOpened" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y max-width="290px" min-width="290px">
									<template v-slot:activator="{ on }"> <v-text-field :value="detailData.lastContact === undefined ? '' : detailData.lastContact.split('T')[1].substring(0, 5)" label="Last Contact Time" prepend-inner-icon="access_time" clearable readonly :rules="[v => !!v || 'Required Field']" v-on="on" dense outlined></v-text-field> </template>
									<v-time-picker :value="detailData.lastContact === undefined ? null : detailData.lastContact.split('T')[1].substring(0, 5)" format="24hr" @input="onLastContactTimeSelected($event)" full-width></v-time-picker>
								</v-menu>
							</v-flex>
							<v-flex class="xs12 sm12 md12 lg12">
								<v-text-field type="number" v-model.number="detailData.customerLifeTimeValue" label="Life Time Value" :rules="[v => !!v || 'Required Field!']" required outlined dense></v-text-field>
							</v-flex>
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
		genders: ['Woman', 'Man'],
		detailData: {},
		pickers: {
			birthdayPickerOpened: false,
			lastContactDatePickerOpened: false,
			lastContactTimePickerOpened: false
		}
	}),
	computed: {
		...mapGetters(['getDetailData', 'getLoading'])
	},
	methods: {
		...mapActions(['requestPostData', 'requestPutData', 'requestDeleteData']),
		setDetailData() {
			this.detailData = JSON.parse(JSON.stringify(this.getDetailData))
			// If detail data not empty, format date fields for date pickers
			if (this.detailData.id != undefined) {
				this.detailData.birthday = this.$moment(new Date(this.detailData.birthday)).format('YYYY-MM-DD')
			}
		},
		onBirthdayDateSelected(date) {
			this.pickers.birthdayPickerOpened = false
			this.detailData.birthday = date
		},
		onLastContactDateSelected(date) {
			this.pickers.lastContactDatePickerOpened = false
			this.detailData.lastContact = new Date(date + 'T' + (this.detailData.lastContact === undefined ? '00:00' : this.detailData.lastContact.split('T')[1].substring(0, 5)) + ':00.000Z').toISOString()
		},
		onLastContactTimeSelected(date) {
			this.pickers.lastContactTimePickerOpened = false
			this.detailData.lastContact = new Date((this.detailData.lastContact === undefined ? new Date().toISOString().split('T')[0] : this.detailData.lastContact.split('T')[0]) + 'T' + date + ':00.000Z').toISOString()
		},
		submit() {
			if (this.$refs.form.validate()) {
				this.detailData.id == undefined ? this.requestPostData({ requestUri: '', data: this.detailData }) : this.requestPutData({ requestUri: '', data: this.detailData })
			}
		}
	},
	mounted() {
		this.setDetailData()
	}
}
</script>
