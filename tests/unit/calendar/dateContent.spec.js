import { shallowMount, createLocalVue } from '@vue/test-utils'
import CalendarContent from '@/components/calendar/CalendarContent.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CalendarContent', () => {
  let store
  let state
  it ('檢查年份(同年)', () => {
    state = {
      year: 2020,
      month: 9
    }
    store = new Vuex.Store({
      state
    })
    const wrapper = shallowMount(CalendarContent, {
      localVue,
      store,
      stubs: {
        CalendarWrapper: true
      }
    })
    expect(wrapper.vm.nextYear).toBe(wrapper.vm.year)
  })
  it ('檢查年份(不同年)', () => {
    state = {
      year: 2020,
      month: 12
    }
    store = new Vuex.Store({
      state
    })
    const wrapper = shallowMount(CalendarContent, {
      localVue,
      store,
      stubs: {
        CalendarWrapper: true
      }
    })
    expect(wrapper.vm.nextYear).toBe(wrapper.vm.year + 1)
  })
  it ('檢查月份(同年)', () => {
    state = {
      year: 2020,
      month: 9
    }
    store = new Vuex.Store({
      state
    })
    const wrapper = shallowMount(CalendarContent, {
      localVue,
      store,
      stubs: {
        CalendarWrapper: true
      }
    })
    expect(wrapper.vm.nextMonth).toBe(wrapper.vm.month + 1)
  })
  it ('檢查月份(不同年)', () => {
    state = {
      year: 2020,
      month: 12
    }
    store = new Vuex.Store({
      state
    })
    const wrapper = shallowMount(CalendarContent, {
      localVue,
      store,
      stubs: {
        CalendarWrapper: true
      }
    })
    expect(wrapper.vm.nextMonth).toBe(1)
  })
})