import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    TabName: 'first'
  },
  mutations: {
    TabName(state, msg) {
      state.TabName = msg;
    }
  },
  actions: {},
  modules: {}
});
