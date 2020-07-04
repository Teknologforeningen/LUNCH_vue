<template>
	<div class="admin-post-container">
		<b-list-group v-bind:key="item.id" v-for="item in newsArr">
			<b-list-group-item>{{item.title}}</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
	import RequetsService from '../../RequestService';

  export default {
    name: 'AdminPanel',
    components: {
        
		},
		data() {
        return {
            newsArr: []
        }
    },
    async created() {
        try {
            this.newsArr = await RequetsService.getRequest('posts');
            console.log(this.newsArr)
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
	}
</style>