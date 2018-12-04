import Vue from 'vue';
import Vuex from 'vuex';
import Service from './services';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    result: [],
  },
  getters: {
    getResult(state) {
      return state.result;
    },
  },
  mutations: {
    setResult(state, payload) {
      state.result = payload;
    },
  },
  actions: {
    async loadRequest1(context, payload) {
      const { category, date } = payload;
      const result = await Service.transactionTotalService.get(undefined,
        [{
          material: category, date,
        }]);
      context.commit('setResult', result);
    },
    async loadRequest2(context, payload) {
      const { category, date } = payload;
      const result = await Service.usagePCostService.get(undefined,
        [{
          material: category, date,
        }]);
      context.commit('setResult', result);
    },
    async loadRequest3(context, payload) {
      const { category, date } = payload;
      const result = await Service.usageUCostService.get(undefined,
        [{
          material: category, date,
        }]);
      context.commit('setResult', result);
    },
    async loadRequest4(context, payload) {
      const { date } = payload;
      const result = await Service.transactionStockService.get(undefined,
        [{
          date,
        }]);
      context.commit('setResult', result);
    },
  },
});
