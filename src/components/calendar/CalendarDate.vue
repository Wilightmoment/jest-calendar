<template>
  <td :class="classes" @click="changeBooking(date)">
    {{ display }}
  </td>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { convertYMD } from '../../utils/date.js'

export default {
  props: {
    date: {
      type: String,
      default: () => new Date().toISOString()
    }
  },
  computed: {
    ...mapState({
      booked: (state) => state.booked,
      booking: (state) => state.booking
    }),
    classes() {
      if (!this.date) return false
      const today = new Date().toISOString().slice(0, 10)
      const date = convertYMD(new Date(this.date))
      if (today > date) {
        return ['calendar-date--pasted']
      } else if (this.booked.includes(this.date)) {
        return ['calendar-date--booked']
      } else if (this.booking.includes(this.date)) {
        if (this.booking.indexOf(this.date) === 0 || this.booking.indexOf(this.date) === this.booking.length - 1) {
          return ['calendar-date--selected']
        }
        return ['calendar-date--in-range']
      } else {
        return ['calendar-date']
      }
    },
    display() {
      return this.date ? String(new Date(this.date).getDate()) : ''
    }
  },
  methods: {
    ...mapActions(['changeBooking'])
  }
}
</script>

<style lang="sass" scoped>
  td
    padding: 10px
  .calendar-date
    &--pasted
      color: #bdbdbd
    &--in-range
      background-color: #f5f5f5
    &--selected
      background-color: #0071c2
      color: white
    &:not(.calendar-date--pasted)
      cursor: pointer
      &:hover
        background-color: #e0e0e0
</style>
