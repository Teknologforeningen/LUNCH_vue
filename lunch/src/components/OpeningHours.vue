<template>
    <div class="hours-container">
        <h2 class="component-title">Opening hours:</h2>
        <pre class="hours-text">{{hours}}</pre>
    </div>
</template>

<script>
import RequestService from '../RequestService';

export default {
	name: "OpeningHours",
	components: {
	},
	data() {
		return {
			hours: ''
		}
	},
	async created() {
		try {
			const tmp = await RequestService.getRequest('hours');
			this.hours = tmp[0].hours;
		} catch(err) {
				console.log(err);
		}
	},
}
</script>

<style scope>
    .hours-container {
        max-width: 500px;
		margin: 0 auto;
		padding: 1rem 0;
	}

	.hours-text {
		text-align: left;
		margin: 8px 0;
	}
</style>