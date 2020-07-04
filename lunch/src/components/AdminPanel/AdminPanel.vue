<template>
	<div>
    <h2>This is the admin panel</h2>
    <AdminPosts />
	</div>
</template>

<script>
	import AdminPosts from './AdminPosts';
  export default {
    name: 'AdminPanel',
    components: {
        AdminPosts
    },
    methods: {

    }
  }
</script>

<style scoped>
</style>