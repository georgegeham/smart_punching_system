<template>
  <v-container fluid class="pb-0 mb-0">
    <v-card style="min-height: max-content" class="py-2">
      <v-row
        v-if="weather.location"
        align="center"
        justify="space-between"
        no-gutters
      >
        <!-- Title section -->
        <v-col cols="12" sm="3" class="text-center">
          <v-card-title class="text-subtitle-1 justify-center">
            Weather Information
          </v-card-title>
        </v-col>

        <v-col cols="12" sm="4" class="d-flex align-center justify-center">
          <v-icon size="32" color="primary" class="mr-3">
            mdi-weather-partly-cloudy
          </v-icon>
          <div class="text-center">
            <h3 class="mb-1">{{ weather.temperature }}°C</h3>
            <p class="mb-0">{{ weather.condition }}</p>
          </div>
        </v-col>

        <v-col cols="12" sm="5">
          <v-list density="compact" class="d-flex justify-space-between">
            <v-list-item>
              <v-list-item-title>Location</v-list-item-title>
              <v-list-item-subtitle>{{
                weather.location
              }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Humidity</v-list-item-title>
              <v-list-item-subtitle
                >{{ weather.humidity }}%</v-list-item-subtitle
              >
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Wind</v-list-item-title>
              <v-list-item-subtitle
                >{{ weather.windSpeed }} km/h</v-list-item-subtitle
              >
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <v-row v-else align="center" justify="center" no-gutters>
        <v-col cols="12" class="text-center">
          <v-card-title class="text-subtitle-1 justify-center">
            Weather Information Not Available, Please Config your WorkPlace
            First
          </v-card-title>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Weather",
  computed: {
    weather() {
      return this.$store.getters.Weather;
    },
  },
};
</script>

<style scoped>
.v-card {
  min-height: 150px;
}
</style>
