<template>
  <v-container fluid class="fill-height pa-0">
    <v-row>
      <v-col cols="12">
        <h2 class="text-h4 mb-4">Employee Records</h2>
      </v-col>
    </v-row>

    <v-row v-if="employees.length === 0">
      <v-col cols="12">
        <v-alert type="info" text>
          No employee records found. Employees will appear here after they punch
          in or out.
        </v-alert>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-container fluid>
        <v-data-table
          :items="employees"
          :headers="headers"
          item-key="employeeId"
          item-selectable
          @click:row="handleClick"
          hover
        >
          <template v-slot:[`item.isWithinArea`]="{ item }">
            <v-chip
              :color="item.isWithinArea ? 'success' : 'error'"
              size="small"
              text-color="white"
              variant="flat"
            >
              {{ item.isWithinArea ? "In Zone" : "Outside" }}
            </v-chip>
          </template>
          <template v-slot:[`item.punchInTime`]="{ item }">
            {{ (item.punchInTime && formatDate(item.punchInTime)) || "--" }}
          </template>
          <template v-slot:[`item.punchOutTime`]="{ item }">
            {{ (item.punchOutTime && formatDate(item.punchOutTime)) || "--" }}
          </template>
        </v-data-table>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "EmployeeRecords",
  computed: {
    employees() {
      return this.$store.getters.Employees;
    },
  },
  data: () => ({
    headers: [
      { title: "Name", value: "name" },
      { title: "Employee ID", value: "employeeId" },
      // { text: "Action", value: "action" },
      // { text: "Time", value: "punchInTime || punchOutTime" },
      { title: "Punch In", value: "punchInTime" },
      { title: "Punch Out", value: "punchOutTime" },
      { title: "Within Area", value: "isWithinArea" },
    ],
  }),
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    handleClick(event, { item }) {
      this.$emit("pinlocation", item);
    },
  },
};
</script>

<style scoped>
.employee-card {
  height: 100%;
  transition: transform 0.2s;
}

.employee-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
