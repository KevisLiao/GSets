import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userCode: 0,
  },
  mutations: {
    updateUserCode(state, payload) {
        const { userCode } = payload
        Vue.set(state, 'userCode', userCode)
      },
  },
  actions: {

  }
})
