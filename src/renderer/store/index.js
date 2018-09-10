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
    addService ({commit, state}, newService) {
      var exist = 0
      for (var i = 0; i < state.services.length; i++) {
        if (this.state.services[i].addresses[0] === newService.addresses[0] &&
          state.services[i].port === newService.port &&
          state.services[i].name === newService.name) {
          exist = 1
          break
        }
      }
      if (exist === 0) {
        commit('pushService', newService)
      }
    },
    removeService ({commit, state}, newService) {
      for (var i = 0; i < state.services.length; i++) {
        if (state.services[i].name === newService.name) {
          break
        }
      }
      if (i < state.services.length) {
        commit('splitService', i)
      }
    }
  },

  mutations: {
    pushService (state, newService) {
      state.services.push(newService)
    },
    splitService (state, index) {
      console.log('splice: ', state.services[index].name)
      state.services.splice(index, 1)
    }
  }
})
