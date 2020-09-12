<template>
	<div>
    <AdminPosts />
    <AdminMessages />
		<AdminHours />
    <AdminPrices />
	</div>
</template>

<script>
	import AdminPosts from './AdminPosts';
  import AdminHours from './AdminHours';
  import AdminPrices from './AdminPrices';
  import AdminMessages from './AdminMessages';

  export default {
    name: 'AdminPanel',
    components: {
        AdminPosts, AdminHours, AdminPrices, AdminMessages
    },
    methods: {

    }
  }
</script>

<style scoped>
</style>