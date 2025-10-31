import Vue from "vue";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
// import { messages } from "vee-validate/dist/locale/en.json";

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
extend("mobile", (value) => {
  return (
    value == value.replace(/[^0-9]/g, "") &&
    value.substring(0, 2) == "01" &&
    value.length == 11
  );
});

extend("email", {
  ...rules.email,
  message: "The value must be a valid email address",
});

extend("required", {
  ...rules.required,
  message: "The value is required",
});
extend("min", {
  ...rules.min,
  message: "The value must be at least {length} characters long",
});
extend("url", (value) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(value);
});
