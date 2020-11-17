import { mutations } from '@/store'
import { dateRest } from '@/utils/date.js'

describe('store', () => {
  describe('changeBooking', () => {
    const date = dateRest(new Date().toISOString())
    const oneDay = 24 * 60 * 60 * 1000
    it ('點擊第一個，直接加入', async () => {
      const state = {
        booking: []
      }
      mutations.CHANGEBOOKING(state, date)
      expect(state).toEqual({
        booking: [date]
      })
    })
    it ('點擊第二個時，且在第一個日期之後', async () => {
      /**
       * 1. 第二個的狀態被選取
       * 2. 中間所有日期的狀態為 in-range
       */
      const state = {
        booking: [date]
      }
      const secondClick = new Date(+new Date(date) + oneDay * 2).toISOString()
      mutations.CHANGEBOOKING(state, secondClick)
      expect(state).toEqual({
        booking: [date, dateRest(new Date(+new Date(date) + oneDay).toISOString()), dateRest(secondClick)]
      })
    })
    it ('點擊第二個時，且在第一個日期之前(直接變成第一個選取)', () => {
      const state = {
        booking: [new Date(+new Date() + oneDay).toISOString()]
      }
      mutations.CHANGEBOOKING(state, date)
      expect(state).toEqual({
        booking: [date]
      })
    })
    it ('點擊第三個，直接變成第一個', () => {
      const state = {
        booking: [date, new Date(+new Date() + oneDay).toISOString()]
      }
      const thirdClick = new Date(+new Date() + oneDay * 2).toISOString()
      mutations.CHANGEBOOKING(state, thirdClick)
      expect(state).toEqual({
        booking: [dateRest(thirdClick)]
      })
    })
  })
  describe('changeMonth', () => {
    it ('同年份，下個月', () => {
      const state = {
        year: 2020,
        month: 9
      }
      mutations.CHANGEMONTH(state, 'next')
      expect(state).toEqual({
        year: 2020,
        month: 10
      })
    })
    it ('同年份，上個月', () => {
      const state = {
        year: 2020,
        month: 9
      }
      mutations.CHANGEMONTH(state, 'prev')
      expect(state).toEqual({
        year: 2020,
        month: 8
      })
    })
    it ('跨年份，下個月', () => {
      const state = {
        year: 2020,
        month: 12
      }
      mutations.CHANGEMONTH(state, 'next')
      expect(state).toEqual({
        year: 2021,
        month: 1
      })
    })
    it ('跨年份，上個月', () => {
      const state = {
        year: 2021,
        month: 1
      }
      mutations.CHANGEMONTH(state, 'prev')
      expect(state).toEqual({
        year: 2020,
        month: 12
      })
    })
  })
})