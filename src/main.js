import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/vee-validate";
import "vuetify/dist/vuetify.min.css";
import vuetify from "./plugins/vuetify";
Vue.config.productionTip = false;
Vue.config.warnHandler = function (msg, vm, trace) {
  if (msg.includes("Component name")) return;
  console.warn(msg + trace);
};
Vue.use(vuetify);
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
