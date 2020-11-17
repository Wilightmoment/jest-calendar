<template>
  <div style="display: inline-block;">
    <div class="calendar-title">
      {{ year }}/{{ month }}
    </div>
    <CalendarDateTable :year="year" :month="month" />
  </div>
</template>

<script>
import CalendarDateTable from './CalendarDateTable'

export default {
  components: {
    CalendarDateTable
  },
  props: {
    year: {
      type: Number,
      default: () => new Date().getFullYear()
    },
    month: {
      type: Number,
      default: () => new Date().getMonth() + 1
    }
  }
}
</script>

<style lang="sass" scoped>
  .calendar-title
    margin-bottom: 1rem
</style>
