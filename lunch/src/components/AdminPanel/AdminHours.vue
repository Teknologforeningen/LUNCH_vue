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
		</b-form>
	</div>
</template>

<script>
	import RequestService from '../../RequestService';

  export default {
    name: 'AdminPanel',
    components: {
        
		},
		data() {
			return {
				text: ''
			}
		},
		async created() {
			try {
				const tmp = await RequestService.getRequest('hours');
				this.text = tmp[0].hours
			} catch(err) {
				console.log(err);
			}
    },
    methods: {

    }
  }
</script>
    
<style scoped>
	.admin-post-container {
		text-align: left;
		min-width: 600px;
		margin-bottom: 16px;
	}
</style>