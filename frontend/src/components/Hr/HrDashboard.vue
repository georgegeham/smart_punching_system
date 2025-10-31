<template>
  <v-container fluid class="d-flex flex-column fill-height pa-0 align-stretch">
    <v-row class="flex-grow-0">
      <v-col cols="12">
        <MyMap
          :location="BusinessSettings?.location"
          :area="BusinessSettings?.area"
          height="30vh"
          :worker="employee"
        />
      </v-col>
    </v-row>
    <v-row no-gutters class="flex-grow-1">
      <v-col cols="12">
        <EmployeeRecords @pinlocation="handlePinLocation" />
      </v-col>
    </v-row>

    <v-row class="flex-grow-0">
      <v-col cols="12" class="pa-0">
        <MyWeather />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import EmployeeRecords from "../Employee/EmployeeRecords.vue";
import MyMap from "../ui/Map.vue";
import MyWeather from "../weather/Weather.vue";

export default {
  name: "HrDashboard",
  computed: {
    BusinessSettings() {
      return this.$store.getters.BusinessSettings;
    },
    Employees() {
      return this.$store.getters.Employees;
    },
  },
  data: () => ({
    employee: null,
  }),
  components: {
    MyWeather,
    MyMap,
    EmployeeRecords,
  },
  methods: {
    handlePinLocation(employee) {
      console.log(employee);
      this.employee = employee;
    },
  },
  // mounted() {
  //   if (!this.BusinessSettings.location) {
  //     this.$store.commit("resetEmployees");
  //     this.$store.commit("resetBusinessSettings");
  //     this.$router.replace("/dashboard/HrForm");
  //   }
  // },
};
</script>
<style></style>
