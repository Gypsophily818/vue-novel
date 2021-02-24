import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import store from "./store";
import router from "./router";

import "vant/lib/index.css";
import Vant from "vant";
Vue.use(Vant);
import { Popup } from "vant";
Vue.use(Popup);
import { Lazyload } from "vant";
Vue.use(Lazyload);
import { Toast } from "vant";
Vue.use(Toast);

import "@/assets/resetui.css";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
