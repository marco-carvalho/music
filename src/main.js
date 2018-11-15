import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {library, dom} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

library.add(fas);
dom.watch();

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
