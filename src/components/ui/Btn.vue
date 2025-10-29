<template>
  <v-tooltip location="top">
    <template v-slot:activator="{ props }">
      <router-link :to="href" v-if="href">
        <v-btn :color="color" :class="{ styles: !!styles }" v-bind="props">{{
          text
        }}</v-btn>
      </router-link>
      <v-btn v-else :color="color" v-bind="props">{{ text }}</v-btn>
    </template>
    <span>{{ TooltipText }}</span>
  </v-tooltip>
</template>
<script>
export default {
  name: "Btn",
  props: {
    text: {
      type: String,
      default: "Go to Dashboard",
    },
    href: {
      type: String,
      default: "/dashboard",
    },
    TooltipText: {
      type: String,
      default: "Navigate to Dashboard",
    },
    color: {
      type: String,
      default: "primary",
    },
    styles: {
      type: String,
      default: "",
    },
  },
};
</script>
<style scoped></style>
