<template>
	<div>
    <AdminPosts />
		<AdminHours />
	</div>
</template>

<script>
	import AdminPosts from './AdminPosts';
	import AdminHours from './AdminHours';

  export default {
    name: 'AdminPanel',
    components: {
        AdminPosts, AdminHours
    },
    methods: {

    }
  }
</script>

<style scoped>
</style>