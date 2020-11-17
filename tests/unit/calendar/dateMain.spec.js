import { shallowMount, createLocalVue } from '@vue/test-utils'
import CalendarMain from '@/components/calendar/CalendarMain.vue'
import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('CalendarMain', () => {
  let store
  let state
  let mutations

  beforeEach(() => {
    state = {
      year: 2020,
      month: 9
    }
    mutations = {
      CHANGEMONTH: jest.fn()
    }
    store = new Vuex.Store({
      state,
      mutations
    })
  })
  it ('檢測上下月是否正常觸發', () => {
    const wrapper = shallowMount(CalendarMain, {
      localVue,
      store
    })
    wrapper.find('.calendar-main--prev').trigger('click')
    expect(mutations.CHANGEMONTH).toHaveBeenCalledWith(state, 'prev')
    wrapper.find('.calendar-main--next').trigger('click')
    expect(mutations.CHANGEMONTH).toHaveBeenCalledWith(state, 'next')
  })
})