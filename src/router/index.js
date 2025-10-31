import MyLayout from "../components/Layout.vue";
import MyStart from "../components/Start.vue";
import HrDashboard from "../components/Hr/HrDashboard.vue";
import HrForm from "../components/Hr/HrForm.vue";
import RegisterPage from "../components/Register/Register.vue";
// import EmployeeForm from "../components/Employee/EmployeeForm.vue";
import EmployeeLayout from "../components/Employee/EmployeeLayout.vue";
import MyLogin from "../components/Login/Login.vue";
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
  { path: "/", name: "Start", component: MyStart },
  {
    path: "/login",
    name: "Login",
    component: MyLogin,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },
  {
    path: "/Hr",
    name: "HR",
    component: MyLayout,
    children: [
      {
        path: "Dashboard",
        name: "HR Dashboard",
        component: HrDashboard,
      },
      {
        path: "Form",
        name: "HR Form",
        component: HrForm,
      },
    ],
  },
  {
    path: "/Employee",
    name: "Employee",
    component: EmployeeLayout,
    // children: [
    //   {
    //     path: "Form",
    //     name: "Employee Form",
    //     component: EmployeeForm,
    //   },
    // ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
