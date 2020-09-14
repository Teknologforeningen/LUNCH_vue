<template>
	<div class="component-container">
		<h2>Prices (€)</h2>
		<b-table striped hover :fields="fields" :items="prices">
			<template v-slot:cell(priceNormal)="data">
				{{ data.value }}
				<b-icon-trash class="icon-delete" icon="trash" @click="showDeleteModal(data.item)"></b-icon-trash>
			</template>
		</b-table>
	</div>
</template>

<script>
import RequestService from '../RequestService';
export default {
	name: "Prices",
	data() {
		return {
            prices: null,
            fields: ['description', 'priceStudent', 'priceNormal']
		}
    },
    async created() {
		try {
			this.prices = await RequestService.getRequest('prices');
			console.log(this.prices);
		} catch(err) {
			console.log(err);
		}
    },
}
</script>
<style scope>

</style>