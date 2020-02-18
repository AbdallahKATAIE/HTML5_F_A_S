import Vue from "vue";
import Helpers from "@assets/js/helpers.js";
import $ from "jquery";
import App from "./App.vue";

Helpers.registerGlobal("$", $);
Helpers.registerGlobal("helpers", Helpers);
Helpers.registerGlobal("Vue", Vue);

Vue.config.productionTip = false;

new Vue({
    el: "#app",
    components: { App }
});
