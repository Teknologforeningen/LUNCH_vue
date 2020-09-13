<template>
    <div v-if="message != ''" class="component-container">
        <h2 class="component-title">Announcements</h2>
        <div class="component-content announcement-text">
            <pre>{{message}}</pre>
        </div>
    </div>
</template>

<script>
import RequestService from '../RequestService';

export default {
	name: "Announcement",
	components: {
	},
	data() {
		return {
			message: ''
		}
	},
	async created() {
		try {
			const tmp = await RequestService.getRequest('messages');
			this.message = tmp[0].message;
		} catch(err) {
				console.log(err);
		}
	},
}
</script>

<style scope>
	.announcement-text {
		text-align: left;
        margin: 8px 0;
        font-weight: bold;
        background-color: #F4F4F4;
        padding: 1rem;
    }
    
    pre {
        margin: 0;
    }
</style>