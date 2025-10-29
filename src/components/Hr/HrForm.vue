<template>
  <v-container fluid class="fill-height">
    <v-row class="fill-height">
      <v-col cols="6">
        <form @submit="onSubmit">
          <v-container class="mr-auto fill-height">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="companyName"
                  :error-messages="companyNameError"
                  label="Company Name"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="location"
                  :error-messages="locationError"
                  label="Workplace Location"
                  required
                  readonly
                  append-inner-icon="mdi-crosshairs-gps"
                  @click:appendInner="captureLocation"
                  hint="Click the GPS icon to capture your current location"
                  persistent-hint
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="area"
                  :error-messages="areaError"
                  label="Area (in meters square)"
                  required
                  type="number"
                  suffix="m2"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-switch
                  v-model="requireFixedHours"
                  label="Require fixed working hours"
                  color="primary"
                ></v-switch>
              </v-col>

              <v-col cols="12" v-if="requireFixedHours">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="startHour"
                      :error-messages="startHourError"
                      label="Start Hour"
                      type="time"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="endHour"
                      :error-messages="endHourError"
                      label="End Hour"
                      type="time"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12">
                <v-btn
                  :disabled="!meta.valid"
                  color="info"
                  :loading="loading"
                  class="mr-4"
                  type="submit"
                >
                  Save Workplace Settings
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </form>
      </v-col>
      <v-col cols="6">
        <v-card outlined class="fill-height pa-4">
          <v-card-title>Current Settings</v-card-title>
          <v-card-text>
            <v-divider class="my-4"></v-divider>
            <v-list lines="two">
              <v-list-item v-if="companyName">
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-domain</v-icon>
                </template>
                <v-list-item-title>Company Name</v-list-item-title>
                <v-list-item-subtitle>{{ companyName }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item v-if="location">
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-map-marker</v-icon>
                </template>
                <Map
                  :location="location"
                  :area="area ? Number(area) : null"
                  height="20vh"
                />
              </v-list-item>

              <v-list-item v-if="area">
                <template v-slot:prepend>
                  <v-icon color="success">mdi-map-marker-radius</v-icon>
                </template>
                <v-list-item-title>Area</v-list-item-title>
                <v-list-item-subtitle
                  >{{ area }} meters square</v-list-item-subtitle
                >
              </v-list-item>

              <v-list-item v-if="requireFixedHours">
                <template v-slot:prepend>
                  <v-icon color="warning">mdi-clock-outline</v-icon>
                </template>
                <v-list-item-title>Working Hours</v-list-item-title>
                <v-list-item-subtitle>
                  {{ startHour || "--:--" }} to {{ endHour || "--:--" }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { computed, ref } from "vue";
// import { useStore } from "vuex";
// import { useRouter } from "vue-router";
// import { useForm, useField } from "vee-validate";
// import { required, min_value } from "@vee-validate/rules";
import Map from "../ui/Map.vue";
// import { getLocation } from "../utils/util";

export default {
  name: "HrForm",
  components: { Map },
  // setup() {
  //   const store = useStore();
  //   const router = useRouter();
  //   const loading = ref(false);
  //   const latitude = ref(null);
  //   const longitude = ref(null);

  //   const BusinessSettings = computed(() => store.getters.BusinessSettings);

  //   const { handleSubmit, meta, values } = useForm({
  //     initialValues: {
  //       companyName: BusinessSettings.value?.companyName || "",
  //       location: BusinessSettings.value?.location || "",
  //       area: BusinessSettings.value?.area || "",
  //       requireFixedHours: BusinessSettings.value?.requireFixedHours || false,
  //       startHour: BusinessSettings.value?.startHour || "",
  //       endHour: BusinessSettings.value?.endHour || "",
  //     },
  //   });

  //   const { value: companyName, errorMessage: companyNameError } = useField(
  //     "companyName",
  //     (value) => {
  //       if (!required(value)) {
  //         return "Company name is required";
  //       }
  //       return true;
  //     }
  //   );

  //   const { value: location, errorMessage: locationError } = useField(
  //     "location",
  //     (value) => {
  //       if (!required(value)) {
  //         return "Location is required";
  //       }
  //       return true;
  //     }
  //   );

  //   const { value: area, errorMessage: areaError } = useField(
  //     "area",
  //     (value) => {
  //       if (!required(value)) {
  //         return "Area is required";
  //       }
  //       if (!min_value(value, { min: 1 })) {
  //         return "Area must be at least 1";
  //       }
  //       return true;
  //     }
  //   );

  //   const { value: requireFixedHours } = useField("requireFixedHours");

  //   const { value: startHour, errorMessage: startHourError } = useField(
  //     "startHour",
  //     (value) => {
  //       if (requireFixedHours.value && !required(value)) {
  //         return "Start hour is required";
  //       }
  //       return true;
  //     }
  //   );

  //   const { value: endHour, errorMessage: endHourError } = useField(
  //     "endHour",
  //     (value) => {
  //       if (requireFixedHours.value) {
  //         if (!required(value)) {
  //           return "End hour is required";
  //         }
  //         if (value && startHour.value && value <= startHour.value) {
  //           return "End hour must be after start hour";
  //         }
  //       }
  //       return true;
  //     }
  //   );

  //   // Set latitude and longitude from BusinessSettings if available
  //   if (BusinessSettings.value?.latitude) {
  //     latitude.value = BusinessSettings.value.latitude;
  //   }
  //   if (BusinessSettings.value?.longitude) {
  //     longitude.value = BusinessSettings.value.longitude;
  //   }

  //   const captureLocation = async () => {
  //     try {
  //       const result = await getLocation(store);
  //       latitude.value = result.latitude;
  //       longitude.value = result.longitude;
  //       location.value = result.location;
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //   const onSubmit = handleSubmit(async (values) => {
  //     const data = {
  //       companyName: values.companyName,
  //       location: values.location,
  //       latitude: latitude.value,
  //       longitude: longitude.value,
  //       area: values.area,
  //       requireFixedHours: values.requireFixedHours,
  //       startHour: values.requireFixedHours ? values.startHour : null,
  //       endHour: values.requireFixedHours ? values.endHour : null,
  //     };

  //     loading.value = true;

  //     await store.dispatch("setBusinessSettings", data);

  //     store.commit("showSnackbar", {
  //       text: "Workplace settings saved successfully!",
  //       color: "success",
  //     });

  //     loading.value = false;
  //     router.push({ name: "HR Dashboard" });
  //   });

  //   return {
  //     companyName,
  //     companyNameError,
  //     location,
  //     locationError,
  //     area,
  //     areaError,
  //     requireFixedHours,
  //     startHour,
  //     startHourError,
  //     endHour,
  //     endHourError,
  //     loading,
  //     latitude,
  //     longitude,
  //     meta,
  //     captureLocation,
  //     onSubmit,
  //   };
  // },
};
</script>

<style scoped></style>
