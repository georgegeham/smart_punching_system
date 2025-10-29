<template>
  <v-app-bar :elevation="2" app>
    <v-app-bar-title>{{ title }}</v-app-bar-title>
    <v-app-bar-actions-item>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar-actions-item>
  </v-app-bar>
</template>
<script>
export default {
  name: "AppBar",
  props: {
    title: {
      type: String,
      default: "Dashboard",
    },
  },
  methods: {
    logout() {
      this.$store.commit("resetEmployees");
      this.$store.commit("resetBusinessSettings");
      this.$store.commit("resetWeather");
      this.$router.push("/");
    },
  },
};
</script>
<style></style>
