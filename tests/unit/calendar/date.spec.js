import { shallowMount, createLocalVue } from '@vue/test-utils'
import CalendarDate from '@/components/calendar/CalendarDate.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CalendarDate', () => {
  let store
  let state
  let actions
  const oneDay = 1000 * 60 * 60 * 24
  const props = {
    date: new Date().toISOString()
  }
  beforeEach(() => {
    actions = {
      changeBooking: jest.fn()
    }
    state = {
      booking: [],
      booked: []
    }
    store = new Vuex.Store({
      state,
      actions
    })
  })

  describe('顯示', () => {
    it ('檢測 props', () => {
      const wrapper = shallowMount(CalendarDate, { store, localVue })
      expect(wrapper.vm.date.slice(0, 10)).toBe(new Date().toISOString().slice(0, 10))
    })
    it ('沒有日期時候', () => {
      const wrapper = shallowMount(CalendarDate, {
        propsData: {
          date: null
        },
        store,
        localVue
      })
      expect(wrapper.classes()).toStrictEqual([])
    })
    it ('過去的日期顯示為灰色', () => {
      const wrapper = shallowMount(CalendarDate, {
        propsData: {
          date: new Date(+new Date() - oneDay).toISOString()
        },
        store,
        localVue
      })
      expect(wrapper.classes()).toContain('calendar-date--pasted')
    })
    it ('已預定的日期被劃記', () => {
      store.state.booked = [props.date]
      const wrapper = shallowMount(CalendarDate, {
        propsData: {
          ...props,
        },
        store,
        localVue
      })
      expect(wrapper.classes()).toContain('calendar-date--booked')
    })
    it ('booking 頭都是被選取的', () => {
      store.state.booking = [props.date]
      const wrapper = shallowMount(CalendarDate, {
        propsData: {
          ...props
        },
        store,
        localVue
      })
      expect(wrapper.classes()).toContain('calendar-date--selected')
    })
    it ('booking 尾都是被選取的', () => {
      const date = new Date(+new Date() + oneDay * 2).toISOString()
      store.state.booking = [props.date, date]
      const wrapper = shallowMount(CalendarDate, {
        propsData: {
          ...props,
          date
        },
        store,
        localVue
      })
      expect(wrapper.classes()).toContain('calendar-date--selected')
    })
    it ('booking 中間都是 in-range', () => {
      store.state.booking = [props.date, new Date(+new Date() + oneDay).toISOString(), new Date(+new Date() + oneDay * 2).toISOString()]
      const wrapper = shallowMount(CalendarDate, {
        propsData: {
          ...props,
          date: new Date(+new Date() + oneDay).toISOString()
        },
        store,
        localVue
      })
      expect(wrapper.classes()).toContain('calendar-date--in-range')
    })
    it ('其餘正常顯示', () => {
      const wrapper = shallowMount(CalendarDate, {
        propsData: {
          ...props
        },
        store,
        localVue
      })
      expect(wrapper.classes()).toContain('calendar-date')
      expect(wrapper.text()).toBe(String(new Date(props.date).getDate()))
    })
  })
  describe('點擊事件', () => {
    it ('點擊觸發 changeBooking', async () => {
      const wrapper = shallowMount(CalendarDate, {
        propsData: {
          ...props
        },
        store,
        localVue
      })
      await wrapper.trigger('click')
      // expect(wrapper.emitted('changeBooking'))
      // expect(wrapper.emitted('changeBooking')[0]).toEqual([props.date])
      expect(actions.changeBooking).toHaveBeenCalled()
    })
    // it ('點擊第二個時，且在第一個日期之後', async () => {
    //   /**
    //    * 1. 第二個的狀態被選取
    //    * 2. 中間所有日期的狀態為 in-range
    //    */
    //   const wrapper = shallowMount(CalendarDate, {
    //     propsData: {
    //       ...props,
    //       date: new Date(+new Date() + oneDay * 2).toISOString(),
    //       booking: [props.date]
    //     }
    //   })
    //   const expected = [props.date, new Date(+new Date() + oneDay).toISOString(), new Date(+new Date() + oneDay * 2).toISOString()]
    //   await wrapper.trigger('click')
    //   expect(wrapper.vm.booking).toEqual(expect.arrayContaining(expected))
    // })
    // it ('點擊第二個時，且在第一個日期之前(直接變成第一個選取)', () => {
    //   const wrapper = shallowMount(CalendarDate, {
    //     propsData: {
    //       ...props,
    //       booking: [new Date(+new Date() + oneDay).toISOString()]
    //     }
    //   })
    //   wrapper.trigger('click')
    //   expect(wrapper.vm.booking).toEqual(warpper.arrayContaining([props.data]))
    // })
  })
})