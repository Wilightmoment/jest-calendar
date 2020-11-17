import Vue from 'vue'
import Vuex from 'vuex'
import { dateRest } from '@/utils/date.js'

Vue.use(Vuex)

export const mutations = {
  CHANGEBOOKING(state, payload) {
    let data = [...state.booking]
    if (data.length < 1 || data.length > 1 || data[0] > payload) {
      data = [dateRest(payload)]
    } else {
      const oneDay = 24 * 60 * 60 * 1000
      // const diff = new Date(payload).getDate() - new Date(data[0]).getDate() + 1
      const diff = (Math.abs(new Date(payload) - new Date(data[0])) / 1000 / 60 / 60 / 24) + 1
      for (let i = 1; i < diff; i += 1) {
        const timestamp = new Date(data[0]).getTime() + oneDay * i
        data.push(dateRest(new Date(timestamp).toISOString()))
      }
    }
    state.booking = data
  },
  CHANGEMONTH(state, payload) {
    const { month } = state
    if (payload === 'next') {
      if (month < 12) {
        state.month += 1
      } else {
        state.month = 1
        state.year += 1
      }
    } else {
      if (month === 1) {
        state.month = 12
        state.year -= 1
      } else {
        state.month -= 1
      }
    }
  }
}

export default new Vuex.Store({
  state: {
    booking: [],
    booked: [],
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  },
  mutations,
  actions: {
    changeBooking({ commit }, payload) {
      commit('CHANGEBOOKING', payload)
    }
  }
})
