<template>
	<v-container fluid>
		<v-card>
			<v-card-title>
				<span class="headline secondary--text">Customer List</span>
				<v-spacer></v-spacer>
				<v-btn class="mx-2" fab dark small color="info" @click="getPageList()"> <v-icon dark>mdi-refresh</v-icon> </v-btn>
				<v-btn class="mx-2" fab dark small color="success" @click="routeDetailPage({})"> <v-icon dark>add</v-icon> </v-btn>
			</v-card-title>
			<v-card-text>
				<v-data-table :headers="headers" :items="getPage.mainList" :items-per-page="10" :loading="getTableLoading" class="elevation-1">
					<template v-slot:body="{ items }">
						<tbody>
							<tr v-for="item in items" :key="item.id">
								<td>{{ item.firstName }}</td>
								<td>{{ item.lastName }}</td>
								<td>{{ item.birthday.split('T')[0] }}</td>
								<td class="text-center">{{ item.gender }}</td>
								<td>{{ item.lastContact.split('T')[0] + ' ' + item.lastContact.split('T')[1].substring(0, 8) }}</td>
								<td>{{ item.customerLifeTimeValue }}</td>
								<td class="text-center">
									<v-btn fab small icon dark color="info" @click="routeDetailPage(item)"> <v-icon dark>edit</v-icon> </v-btn>
								</td>
							</tr>
							<tr v-if="items.length === 0">
								<td colspan="7" class="text-center">No Customer Found...</td>
							</tr>
						</tbody>
					</template>
				</v-data-table>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'CustomerList',
	data: () => ({
		headers: [
			{ text: 'First Name', align: 'left', sortable: false, value: 'firstName', width: '20%' },
			{ text: 'Last Name', align: 'left', sortable: false, value: 'lastName', width: '20%' },
			{ text: 'Birthday', align: 'left', sortable: false, value: 'birthday', width: '10%' },
			{ text: 'Gender', align: 'center', sortable: false, value: 'gender', width: '10%' },
			{ text: 'Last Contact', align: 'left', sortable: false, value: 'lastContact', width: '20%' },
			{ text: 'Life Time', align: 'left', sortable: false, value: 'customerLifeTimeValue', width: '10%' },
			{ text: 'Edit & Delete', align: 'center', sortable: false, value: 'delete', width: '10%' }
		]
	}),
	computed: {
		...mapGetters(['getPage', 'getTableLoading'])
	},
	methods: {
		...mapActions(['requestMainListOfPage', 'setDetailDataOfPage']),
		getPageList() {
			this.requestMainListOfPage({ requestUri: '' })
		},
		routeDetailPage(customerObj) {
			this.setDetailDataOfPage(customerObj)
			this.$router.push({ path: 'customer-detail' })
		}
	},
	mounted() {
		this.getPageList()
	}
}
</script>
