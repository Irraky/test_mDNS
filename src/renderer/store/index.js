import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // = data
    services: []
  },

  getters: { // = computed properties
    serviceList (state, getters) {
      return state.services
    }
  },

  actions: {
    addService ({commit}, newService) {
      commit('pushService', newService)
    }
  },

  mutations: {
    pushService (state, newService) {
      state.services.push(newService)
    },
    splitService (state, newService, index) {
      state.services.split(index, 1, newService)
    }
  }
})
