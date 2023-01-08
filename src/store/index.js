import { createStore } from "vuex";
import loginStore from "./loginStore";
import refreshtoken from "./refreshtoken";
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    loginStore,
    refreshtoken,
  },
  plugins: [],
});
