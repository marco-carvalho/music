import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome";
import "@fortawesome/fontawesome-free-solid/";
import axios from "axios";

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
