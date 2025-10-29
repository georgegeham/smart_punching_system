<template>
  <v-container fluid>
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
        <!-- <v-col
        v-for="(employee, index) in employees"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          elevation="2"
          class="employee-card"
          @click="this.$emit('pinlocation', employee)"
        >
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-truncate">{{ employee.name }}</span>
            <v-chip
              :color="employee.isWithinArea ? 'success' : 'warning'"
              small
              label
            >
              {{ employee.isWithinArea ? "In Zone" : "Outside" }}
            </v-chip>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="primary" small>mdi-badge-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>Employee ID</v-list-item-subtitle>
                  <v-list-item-title>{{
                    employee.employeeId
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon :color="employee.punchInTime ? 'green' : 'red'" small>
                    {{ employee.punchInTime ? "mdi-login" : "mdi-logout" }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>Action</v-list-item-subtitle>
                  <v-list-item-title>
                    {{ employee.punchInTime ? "Punch In" : "Punch Out" }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="info" small>mdi-clock-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>Time</v-list-item-subtitle>
                  <v-list-item-title>
                    {{ employee.punchInTime || employee.punchOutTime }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="orange" small>mdi-map-marker-distance</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>Distance</v-list-item-subtitle>
                  <v-list-item-title>
                    {{
                      employee.distance
                        ? employee.distance.toFixed(2) + " m"
                        : "N/A"
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item v-if="employee.timestamp">
                <v-list-item-icon>
                  <v-icon color="grey" small>mdi-calendar-clock</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>Date</v-list-item-subtitle>
                  <v-list-item-title>
                    {{ formatDate(employee.timestamp) }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col> -->
        <v-data-table
          :items="employees"
          :headers="headers"
          item-key="employeeId"
          item-selectable
          @click:row="handleClick"
          hover
        >
          <template #item.isWithinArea="{ item }">
            <v-chip
              :color="item.isWithinArea ? 'success' : 'error'"
              size="small"
              text-color="white"
              variant="flat"
            >
              {{ item.isWithinArea ? "In Zone" : "Outside" }}
            </v-chip>
          </template>
          <template #item.punchInTime="{ item }">
            {{ (item.punchInTime && formatDate(item.punchInTime)) || "--" }}
          </template>
          <template #item.punchOutTime="{ item }">
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
