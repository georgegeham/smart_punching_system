<template>
  <v-app class="d-flex flex-column fill-height">
    <!-- Top Bar -->
    <AppBar :title="$router.currentRoute.value.name" />

    <!-- Main Content -->
    <v-main class="flex-grow-1">
      <router-view />
    </v-main>

    <!-- Footer -->
    <AppFooter />
  </v-app>
</template>

<script>
import AppBar from "./AppBar.vue";
import AppFooter from "./AppFooter.vue";

export default {
  name: "MyLayout",
  components: {
    AppBar,
    AppFooter,
  },
};
</script>

<style scoped>
.v-application {
  height: 100%;
}
</style>
