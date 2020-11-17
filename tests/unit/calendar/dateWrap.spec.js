import { shallowMount } from '@vue/test-utils'
import CalendarWrapper from '@/components/calendar/CalendarWrapper'

describe('CalendarWrapper', () => {
  it ('檢查預設 props', () => {
    const wrapper = shallowMount(CalendarWrapper, {
      stubs: {
        CalendarDateTable: true
      }
    })
    expect(wrapper.vm.year).toBe(new Date().getFullYear())
    expect(wrapper.vm.month).toBe(new Date().getMonth() + 1)
  })
  it('檢測顯示', () => {
    const props = {
      year: 2020,
      month: 9
    }
    const wrapper = shallowMount(CalendarWrapper, {
      propsData: {
        ...props
      },
      stubs: {
        CalendarDateTable: true
      }
    })
    expect(wrapper.find('.calendar-title').text()).toBe(`${props.year}/${props.month}`)
  })
})