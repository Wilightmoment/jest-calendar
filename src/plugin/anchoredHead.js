/* eslint-disable */
import Vue from 'vue'
import mixin from './mixintest.js'

const getChildrenTextContent = function (children) {
  return children.map(function (node) {
    return node.children ? getChildrenTextContent(node.children) : node.text
  }).join('')
}

const anchoredHead = Vue.extend({
  props: {
    level: {
      type: Number,
      required: true
    }
  },
  mixins: [mixin],
  created() {
    console.log('anchoredHead')
    this.show()
  },
  render: function (h) {
    const id = getChildrenTextContent(this.$slots.default)
      .toLowerCase()
      .replace(/\W+/g, '-')
      .replace(/(^-|^$)/g, '')
    return h(
      'h' + this.level,
      [
        h('a', {
          attrs: {
            name: id,
            href: '#' + id
          }
        }, this.$slots.default)
      ]
    )
  }
})

const install = function (Vue, options) {
  Vue.component('anchored-heading', anchoredHead)
}
export default install