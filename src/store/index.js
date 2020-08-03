import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    TabName: 'three'
  },
  mutations: {
    TabName(state, msg) {
      state.TabName = msg;
    }
  },
  actions: {},
  modules: {}
});
