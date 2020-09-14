<template>
    <div class="component-container">
        <h2 class="component-title">Opening hours</h2>
		<div class="component-content">
			<pre class="hours-text">{{hours}}</pre>
		</div>
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
	.hours-text {
		text-align: left;
		margin: 8px 0;
		font-weight: bold;
	}
</style>