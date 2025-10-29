<template>
  <v-snackbar
    v-model="visible"
    :color="color"
    :timeout="3000"
    @update:model-value="onClose"
  >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="onClose(false)">Close</v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  name: "Snackbar",
  computed: {
    visible() {
      return this.$store.getters["snackbarVisible"];
    },
    text() {
      return this.$store.getters["snackbarText"];
    },
    color() {
      return this.$store.getters["snackbarColor"];
    },
  },
  methods: {
    onClose(value) {
      if (!value) {
        this.$store.commit("hideSnackbar");
      }
    },
  },
};
</script>
<style></style>
