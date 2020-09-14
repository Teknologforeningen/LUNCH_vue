<template>
	<div class="admin-post-container">
		<h2>Prices:</h2>
		<b-table striped hover :fields="fields" :items="prices">
			<template v-slot:cell(priceNormal)="data">
				{{ data.value }}
				<b-icon-trash class="icon-delete" icon="trash" @click="showDeleteModal(data.item)"></b-icon-trash>
			</template>
		</b-table>
		<b-button class="add-button" variant="primary" @click="openModal">Add price</b-button>
		<b-modal id="add-price-modal" title="Add Post" hide-footer>
			<b-form @submit="onSubmit">
				<b-form-group
					id="description-group"
					label="Add description:"
					label-for="description-input"
				>
					<b-form-input
						id="description-input"
						v-model="addPrice.description"
						type="text"
						required
						placeholder="Enter description"
					></b-form-input>
				</b-form-group>
				<b-form-group
					id="student-price-group"
					label="Add student price:"
					label-for="student-price-input"
				>
					<b-form-input
						id="student-price-input"
						v-model="addPrice.priceStudent"
						type="number"
						step="0.01"
						required
						placeholder="Enter student price"
					></b-form-input>
				</b-form-group>
				<b-form-group
					id="normal-price-group"
					label="Add normal price:"
					label-for="normal-price-input"
				>
					<b-form-input
						id="normal-price-input"
						v-model="addPrice.priceNormal"
						type="number"
						step="0.01"
						required
						placeholder="Enter normal price"
					></b-form-input>
				</b-form-group>
				<b-button type="submit" variant="success">Add</b-button>
			</b-form>
		</b-modal>
	</div>
</template>

<script>
	import RequestService from '../../RequestService';
	import { BIconTrash } from "bootstrap-vue";

  export default {
    name: 'AdminPrices',
    components: {
        BIconTrash
	},
	data() {
		return {
			prices: [],
			fields: ['description', 'priceStudent', 'priceNormal'],
			addPrice: {
				description: '',
				priceStudent: undefined,
				priceNormal: undefined
			}
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
    methods: {
			async onSubmit(evt) {
				evt.preventDefault()
				try {
					const text = JSON.stringify(this.addPrice);
					await RequestService.sendRequest('prices', text);
					this.prices = await RequestService.getRequest('prices');
				} catch (err) {
					console.log(err);
				}
				this.closeModal();
			},

			showDeleteModal(row) {
				this.$bvModal.msgBoxConfirm('Are you sure?')
          .then(value => {
            if (value) {
							this.deleteRow(row._id);
						}
          })
          .catch(err => {
            console.log(err);
          })
			},

			deleteRow(id) {
				RequestService.deleteRequest("prices", id)
        .then(() => {
          this.prices = this.prices.filter(item => item._id !== id);
        })
        .catch(error => {
          console.log(error.response);
				});
			},

			openModal() {
				this.$root.$emit('bv::show::modal', 'add-price-modal');
			},

			closeModal() {
				this.$root.$emit('bv::hide::modal', 'add-price-modal');
				this.addPrice = {description: '', priceStudent: undefined, priceNormal: undefined};
			}
    }
  }
</script>
    
<style scoped>
	.add-button {
		margin-top: 16px;
	}

	.icon-delete {
		float: right;
	}

	.icon-delete:hover {
		color: #dc3545;
	}

</style>