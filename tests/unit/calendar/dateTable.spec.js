import { shallowMount } from '@vue/test-utils'
import CalendarDateTable from '@/components/calendar/CalendarDateTable'

describe ('CalendarDateTable', () => {
  const props = {
    month: 9,
    year: 2020
  }
  it ('檢查 props 預設', () => {
    const wrapper = shallowMount(CalendarDateTable, {
      stubs: {
        CalendarDate: true
      }
    })
    expect(wrapper.vm.month).toEqual(new Date().getMonth() + 1)
    expect(wrapper.vm.year).toEqual(new Date().getFullYear())
  })
  it ('輸入月分會回傳天數, getDays()', () => {
    const wrapper = shallowMount(CalendarDateTable, {
      propsData: {
        ...props
      },
      stubs: {
        CalendarDate: true
      }
    })
    expect(wrapper.vm.getDays(props.month)).toBe(30)
    expect(wrapper.vm.getDays(10)).toBe(31)
    expect(wrapper.vm.getDays(2)).toBe(28)
  })
  it ('檢查任一天是否在正確的位置上, splitDate()', () => {
    const day = 24 // 檢測日期
    const wrapper = shallowMount(CalendarDateTable, {
      propsData: {
        ...props
      },
      stubs: {
        CalendarDate: true
      }
    })
    const firstDay = new Date(`${props.year}/${props.month}/1`)
    const offset = firstDay.getDay() - 1
    const arr = wrapper.vm.splitDate()
    const week = ~~((day + offset) / 7)
    firstDay.setDate(day)
    expect(arr[week][firstDay.getDay()].date.slice(0, 10)).toEqual(firstDay.toISOString().slice(0, 10))
  })
  it ('thead 顯示正常', () => {
    const wrapper = shallowMount(CalendarDateTable, {
      propsData: {
        ...props
      },
      stubs: {
        CalendarDate: true
      }
    })
    const dates = wrapper.findAll('thead > tr > th')
    const correct = ['日', '一', '二', '三', '四', '五', '六']
    for (let i = 0; i < dates.length; i++) {
      expect(dates.at(i).text()).toEqual(correct[i])
    }
  })
})