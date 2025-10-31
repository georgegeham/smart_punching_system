<template>
  <div id="app">
    <v-app>
      <router-view />
      <Snackbar />
    </v-app>
  </div>
</template>
<script>
import Snackbar from "./components/ui/Snackbar.vue";
export default {
  name: "App",
  components: {
    Snackbar,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
