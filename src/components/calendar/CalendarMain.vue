<template>
  <div style="display: inline-block">
    <div style="display: flex; justify-content: space-between;">
      <div class="calendar-main--prev" @click="CHANGEMONTH('prev')" style="cursor: pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
      </div>
      <div class="calendar-main--next" @click="CHANGEMONTH('next')" style="cursor: pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
      </div>
    </div>
    <CalendarContent />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import CalendarContent from './CalendarContent'

export default {
  components: {
    CalendarContent,
  },
  methods: {
    ...mapMutations(['CHANGEMONTH'])
  }
}
</script>
