import Vue from "vue";
import VueRouter from "vue-router";
import SubConverter from '../views/Subconverter.vue'

Vue.use(VueRouter);

const routes = [
  { path: '/', component: SubConverter }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
