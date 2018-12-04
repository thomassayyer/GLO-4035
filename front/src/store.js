import Vue from 'vue';
import Vuex from 'vuex';
import Service from './services';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    result: [],
  },
  mutations: {

  },
  actions: {
    async loadRequest1(context, payload) {
      const { category, date } = payload;
      const result = await Service.transactionService.get(undefined,
        [{
          material: category, date,
        }]);
      context.commit('setResult', result);
    },
  },
});
