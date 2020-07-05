<template>
  <div id="app">
    <div id="nav">
      <div class="nav-flex"></div>
      <div class="link-container">
        <router-link to="/">Home</router-link> |
        <router-link to="/admin">Admin</router-link>
      </div>
      <div class="nav-flex">
        <b-button v-if="showLogout && isAuthenticated()" @click="logout()" variant="outline-info" class="mb-2 logout-button">
          <b-icon-power icon="power" aria-hidden="true"></b-icon-power> Logout
        </b-button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { BIconPower } from "bootstrap-vue";

export default {
  components: {
      BIconPower
  },
  data() {
    return {
      showLogout: false
    }
  },
  methods: {
    isAuthenticated() {
      return localStorage.getItem('token') !== null;
    },

    logout() {
      localStorage.removeItem('token');
      this.$router.go();
    }
  },
  watch:{
    $route (to) {
        if (to.name == "Admin") {
          console.log(to);
          this.showLogout = true;
        } else {
          this.showLogout = false;
        }
    }
  } 
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.link-container {
  justify-content: center;
}

.logout-button {
  float: right;
}

.nav-flex {
  flex: 1;
}
</style>
