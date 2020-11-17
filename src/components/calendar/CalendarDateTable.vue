<template>
  <table>
    <thead>
      <tr>
        <th>日</th>
        <th>一</th>
        <th>二</th>
        <th>三</th>
        <th>四</th>
        <th>五</th>
        <th>六</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(weeks, index) in dateArr" :key="index">
        <CalendarDate v-for="date in weeks" :key="date.date" :date="date.date" />
      </tr>
    </tbody>
  </table>
</template>

<script>
import CalendarDate from './CalendarDate.vue'

export default {
  components: {
    CalendarDate
  },
  props: {
    month: {
      type: Number,
      default: () => new Date().getMonth() + 1
    },
    year: {
      type: Number,
      default: () => new Date().getFullYear()
    }
  },
  data: () => ({
    dateArr: []
  }),
  created() {
    this.dateArr = this.splitDate()
  },
  watch: {
    month() {
      this.dateArr = this.splitDate()
    }
  },
  methods: {
    splitDate() {
      const res = [
        [{ date: null }, { date: null }, { date: null }, { date: null }, { date: null }, { date: null }, { date: null }],
        [{ date: null }, { date: null }, { date: null }, { date: null }, { date: null }, { date: null }, { date: null }],
        [{ date: null }, { date: null }, { date: null }, { date: null }, { date: null }, { date: null }, { date: null }],
        [{ date: null }, { date: null }, { date: null }, { date: null }, { date: null }, { date: null }, { date: null }],
        [{ date: null }, { date: null }, { date: null }, { date: null }, { date: null }, { date: null }, { date: null }],
        [{ date: null }, { date: null }, { date: null }, { date: null }, { date: null }, { date: null }, { date: null }]
      ]
      const days = this.getDays(this.month)
      const date = new Date(`${this.year}-${this.month}-1`)
      const oneDay = 60 * 60 * 24 * 1000
      const offset = date.getDay() - 1
      for (let i = 0; i < days; i += 1) {
        const tempDate = new Date(date.getTime() + i * oneDay)
        const week = Math.floor((tempDate.getDate() + offset) / 7)
        res[week][tempDate.getDay()] = {
          date: tempDate.toISOString()
        }
      }
      return res
    },
    getDays(month) {
      const thirty = [4, 6, 9, 11]
      const thirtyOne = [1, 3, 5, 7, 8, 10, 12]
      if (thirty.includes(month)) {
        return 30
      }
      if (thirtyOne.includes(month)) {
        return 31
      }
      // 2月 待補閏年
      return 28
    }
  }
}
</script>
