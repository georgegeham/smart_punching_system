<template>
  <v-container fluid class="fill-height">
    <v-row class="fill-height">
      <v-col cols="6">
        <form @submit.prevent="onSubmit">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  label="Employee Name"
                  :error-messages="nameError"
                  prepend-icon="mdi-account"
                  required
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="employeeId"
                  label="Employee ID"
                  :error-messages="idError"
                  prepend-icon="mdi-badge-account"
                  required
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="location"
                  label="Current Location"
                  :error-messages="locationError"
                  readonly
                  prepend-icon="mdi-crosshairs-gps"
                  @click:prepend="captureLocation"
                  hint="Click the GPS icon to capture your current location"
                  persistent-hint
                />
              </v-col>

              <v-col cols="12">
                <v-radio-group v-model="actionType" row>
                  <v-radio label="Punch In" value="punchIn" />
                  <v-radio label="Punch Out" value="punchOut" />
                </v-radio-group>
              </v-col>

              <v-col cols="12" v-if="distance !== null">
                <v-alert type="info" dense text>
                  <strong>Distance from workplace:</strong>
                  {{ distance.toFixed(2) }} meters
                </v-alert>
              </v-col>

              <v-col cols="12">
                <v-btn
                  type="submit"
                  color="info"
                  :loading="loading"
                  class="mr-4"
                >
                  {{ actionType === "punchIn" ? "Punch In" : "Punch Out" }}
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </form>
      </v-col>

      <v-col cols="6">
        <v-card outlined class="fill-height pa-4">
          <v-card-title>Employee Information</v-card-title>
          <v-divider class="my-4" />
          <v-list lines="two">
            <v-list-item v-if="name">
              <v-list-item-icon>
                <v-icon color="primary">mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Name</v-list-item-title>
                <v-list-item-subtitle>{{ name }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="employeeId">
              <v-list-item-icon>
                <v-icon color="success">mdi-badge-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Employee ID</v-list-item-title>
                <v-list-item-subtitle>{{ employeeId }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="location">
              <v-list-item-icon>
                <v-icon color="warning">mdi-map-marker</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <MyMap :location="location" height="20vh" />
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="actionType">
              <v-list-item-icon>
                <v-icon :color="actionType === 'punchIn' ? 'green' : 'red'">
                  {{ actionType === "punchIn" ? "mdi-login" : "mdi-logout" }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Action</v-list-item-title>
                <v-list-item-subtitle>
                  {{ actionType === "punchIn" ? "Punch In" : "Punch Out" }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="currentTime">
              <v-list-item-icon>
                <v-icon color="info">mdi-clock-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Time</v-list-item-title>
                <v-list-item-subtitle>{{ currentTime }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useForm, useField } from "vee-validate";
import { required, min } from "@vee-validate/rules";
import { defineRule } from "vee-validate";
import MyMap from "../ui/Map.vue";
import { getLocation } from "../utils/util";
import { useStore } from "vuex";

defineRule("required", required);
defineRule("min", min);

const store = useStore();
const loading = ref(false);
const latitude = ref(null);
const longitude = ref(null);
const distance = ref(null);
const actionType = ref("punchIn");
const currentTime = ref("");

const { handleSubmit, resetForm } = useForm();

const { value: name, errorMessage: nameError } = useField(
  "name",
  "required|min:2"
);
const { value: employeeId, errorMessage: idError } = useField(
  "employeeId",
  "required|min:3"
);
const { value: location, errorMessage: locationError } = useField(
  "location",
  "required"
);

const captureLocation = async () => {
  try {
    const result = await getLocation(store);
    latitude.value = result.latitude;
    longitude.value = result.longitude;
    location.value = result.location;

    const businessSettings = store.getters.BusinessSettings;
    if (businessSettings?.latitude && businessSettings?.longitude) {
      const employeeLatLng = window.L.latLng(latitude.value, longitude.value);
      const workplaceLatLng = window.L.latLng(
        businessSettings.latitude,
        businessSettings.longitude
      );
      distance.value = employeeLatLng.distanceTo(workplaceLatLng);
    }
  } catch (e) {
    console.error(e);
  }
};

const getCurrentTime = () => new Date().toLocaleString("en-US");

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  currentTime.value = getCurrentTime();

  const employee = {
    ...values,
    latitude: latitude.value,
    longitude: longitude.value,
    distance: distance.value,
    timestamp: new Date().toISOString(),
    [actionType.value === "punchIn" ? "punchInTime" : "punchOutTime"]:
      currentTime.value,
  };

  try {
    await store.dispatch("AddEmployee", employee);
    store.commit("showSnackbar", {
      text: `${
        actionType.value === "punchIn" ? "Punch in" : "Punch out"
      } recorded successfully!`,
      color: "success",
    });
    resetForm();
    distance.value = null;
    currentTime.value = "";
  } catch (error) {
    store.commit("showSnackbar", {
      text: error.message || "An error occurred",
      color: "error",
    });
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped></style>
