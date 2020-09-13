<template>
  <div class="admin-page-container">
    <h1>Admin page</h1>
    <Login v-if="!isAuthenticated()" />
    <AdminPanel v-if="isAuthenticated()" />
  </div>
</template>

<script>
  import Login from '../components/Login';
  import AdminPanel from '../components/AdminPanel/AdminPanel';

  export default {
    name: 'Admin',
    components: {
      Login, AdminPanel
    },
    methods: {
      isAuthenticated() {
        return localStorage.getItem('token') !== null;
      }
    }
  }
</script>

<style scoped>
  .admin-page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    padding: 2rem 1rem;
  }
</style>