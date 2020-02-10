<template>
	<div>
		<v-dialog v-model="show" persistent max-width="360">
			<v-card>
				<v-card-title class="headline">Are you sure ?</v-card-title>
				<v-card-text>Customer will be deleted! Are you sure ?</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="warning" @click="$emit('hide')"> <v-icon>cancel</v-icon> </v-btn>
					<v-btn color="error" @click="apply"> <v-icon>delete</v-icon> </v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
export default {
	props: ['show'],
	methods: {
		apply() {
			this.$emit('hide')
			this.$emit('apply')
		}
	}
}
</script>
