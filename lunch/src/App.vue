<template>
  <div id="app">
    <div id="nav">
      <div class="nav-flex"></div>
        <div class="nav-logo-container">
          <img class="nav-logo" src="./assets/taffa_logo_white.png">
        </div>
      <!-- <div class="link-container">
        <router-link to="/">Home</router-link> |
        <router-link to="/admin">Admin</router-link>
      </div> -->
      <div class="nav-flex-right">
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
@import 'main.css';
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

#nav {
  height: 64px;
  display: flex;
  background-color: #f24844;
  box-shadow: 0px 1px 10px #999;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.nav-logo-container {
  object-fit: contain;
}

.nav-logo {
  height: 64px;
}

.link-container {
  justify-content: center;
}

.logout-button {
  margin-right: 1rem;
  color: #ffffff;
  border-color: #ffffff;
}

.nav-flex {
  flex: 1;
}

.nav-flex-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

</style>
