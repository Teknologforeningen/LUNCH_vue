<template>
	<div>
    <AdminPosts />
		<AdminHours />
    <AdminPrices />
	</div>
</template>

<script>
	import AdminPosts from './AdminPosts';
  import AdminHours from './AdminHours';
  import AdminPrices from './AdminPrices';

  export default {
    name: 'AdminPanel',
    components: {
        AdminPosts, AdminHours, AdminPrices
    },
    methods: {

    }
  }
</script>

<style scoped>
</style>