<template>
  <v-container
    fluid
    class="d-flex fill-height align-center justify-center"
    width="500"
  >
    <v-card class="pa-4 text-center rounded-md">
      <v-card-title class="text-h4 justify-center">Login Page</v-card-title>
      <v-card-text>
        <v-container>
          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-btn
                color="primary"
                :class="['ma-2 w-66', { activeBtn: userType === 'HR' }]"
                @click="changeType('HR')"
              >
                <v-icon icon="mdi-cog-outline" start></v-icon>
                HR
              </v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn
                color="primary"
                :class="[
                  'ma-2 w-66 w-md-75',
                  { activeBtn: userType === 'Employee' },
                ]"
                @click="changeType('Employee')"
              >
                <v-icon icon="mdi-account-outline"></v-icon>
                Employee
              </v-btn>
            </v-col>
            <v-col cols="12" class="mt-4">
              <v-form @submit.prevent="onSubmit">
                <v-text-field
                  label="Username"
                  class="mb-4"
                  placeholder="Enter your Username"
                  v-model="username.value.value"
                  :error-messages="username.errorMessage.value"
                ></v-text-field>
                <v-text-field
                  label="Password"
                  type="password"
                  class="mb-4"
                  placeholder="Enter your Password"
                  v-model="password.value.value"
                  :error-messages="password.errorMessage.value"
                ></v-text-field>
                <v-btn
                  color="primary"
                  class="mt-2"
                  :loading="loading"
                  type="submit"
                  >Login as {{ userType }}</v-btn
                >
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { ref } from "vue";
import { useForm, useField } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "Login",
  methods: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const { handleSubmit } = useForm({
      validationSchema: {
        username(value) {
          if (!value) return "Username is required";
          if (value.length < 3)
            return "Name must be at least 3 characters long";
          return true;
        },
        password(value) {
          if (!value) return "Password is required";
          if (value.length < 6)
            return "Password must be at least 6 characters long";
          return true;
        },
      },
    });

    const username = useField("username");
    const password = useField("password");
    const userType = ref("HR");
    const loading = ref(false);
    const changeType = (type) => (userType.value = type);
    async function FakeApi({ username, password }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === "admin" && password === "123456")
            resolve({
              success: true,
              message: "Login successful",
              status: 200,
            });
          else
            reject({
              success: false,
              message: "Invalid username or password",
              status: 401,
            });
        }, 1000);
      });
    }
    const onSubmit = handleSubmit(async (values) => {
      loading.value = true;
      console.log(userType.value);
      try {
        const response = await FakeApi(values);

        store.commit("showSnackbar", {
          text: response.message,
          color: "success",
        });
        if (userType.value === "HR") router.push({ name: "HR Dashboard" });
        else router.push({ name: "Employee Form" });
      } catch (error) {
        store.commit("showSnackbar", {
          text: error.message,
          color: "error",
        });
      } finally {
        loading.value = false;
      }
    });

    return { username, password, userType, changeType, onSubmit, loading };
  },
};
</script>
<style scoped>
.v-btn {
  transition: "all 0.3s ease";
}

.activeBtn {
  background-color: #d2b619 !important;
  color: white !important;
  /* box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2); */
}
</style>
