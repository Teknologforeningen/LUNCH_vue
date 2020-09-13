<template>
	<div class="admin-post-container">
		<h2>Opening hours:</h2>
		<b-form>
			<b-form-group
				id="hours-group"
				label-for="hours-textarea"
				description="You can use shift + enter to jump to the next row"
			>
				<b-form-textarea
					id="hours-textarea"
					v-model="text"
					placeholder="Add opening hours"
					rows="4"
					max-rows="6"
				></b-form-textarea>
			</b-form-group>
			<b-button :disabled="oldtext == text" class="add-button" variant="primary" @click="showUpdateModal()">Update hours</b-button>
		</b-form>
	</div>
</template>

<script>
	import RequestService from '../../RequestService';

  export default {
    name: 'AdminHours',
    components: {
        
		},
		data() {
			return {
				oldtext: '',
				text: ''
			}
		},
		async created() {
			try {
				const tmp = await RequestService.getRequest('hours');
				this.text = tmp[0].hours;
				this.oldtext = this.text;
			} catch(err) {
				console.log(err);
			}
    },
    methods: {
			async showUpdateModal() {
				this.$bvModal.msgBoxConfirm('Are you sure?')
          .then(value => {
            if (value) {
				this.updateHours();
				this.oldtext = this.text;
			}
          })
          .catch(err => {
            console.log(err);
          })
			},
			async updateHours() {
				try {
					const text = JSON.stringify(this.text);
					await RequestService.sendRequest('hours', text);
				} catch (err) {
					console.log(err);
				}
			}
    }
  }
</script>
    
<style scoped>
	.add-button {
		margin-top: 16px;
	}
</style>