import Vue from 'vue'
import Vuex from 'vuex'
import prepareApartmentList from '../utils/prepareApartmentList'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apartmentList: [],
  },
  mutations: {
    CHANGE_APARTMENT_LIST(state, data) {
      state.apartmentList = data
    },
    CHANGE_APARTMENT_LIKE(state, index) {
      state.apartmentList[index].isLike = !state.apartmentList[index].isLike
    },
  },
  actions: {
    async fetchApartments({ commit }) {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=9')
        const apartments = await res.json()
        const preparedApartments = prepareApartmentList(apartments)

        commit('CHANGE_APARTMENT_LIST', preparedApartments)
      } catch (e) {
        console.log(e)
        throw e
      }
    },
  },
})
