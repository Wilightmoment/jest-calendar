import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      name: '12315'
    }
  },
  created() {
    console.log('form mixinTest')
  },
  methods: {
    show() {
      console.log(this.name)
    }
  }
})
