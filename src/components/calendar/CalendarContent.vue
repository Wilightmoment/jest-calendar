<template>
  <div style="display: flex; justify-content: center;">
    <CalendarWrapper :year="year" :month="month" style="margin-right: 1rem" />
    <CalendarWrapper :year="nextYear" :month="nextMonth" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CalendarWrapper from './CalendarWrapper'

export default {
  components: {
    CalendarWrapper
  },
  computed: {
    ...mapState({
      year: (state) => state.year,
      month: (state) => state.month
    }),
    nextYear() {
      if (this.month === 12) return this.year + 1
      return this.year
    },
    nextMonth() {
      if (this.month === 12) return 1
      return this.month + 1
    }
  }
}
</script>
