import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    TabName: 'first',
    timeStamp: ''
  },
  mutations: {
    TabName(state, msg) {
      state.TabName = msg;
    },
    timeStamp(state, msg) {
      state.timeStamp = msg;
    }
  },
  actions: {},
  modules: {}
});
