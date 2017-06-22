import Vue from 'vue'
import { map } from 'lodash'
import isMobile from '../utils/isMobile'
import { scrollToElm } from '../utils/scroll'

const Aba = Vue.component('aba', {
  props: ['content', 'title', 'mobile', 'currentTitle'],
  methods: {
    selected: function({ target }) {
      this.$emit('selected', target)
    },
  },
  computed: {
    isActive: function() {
      return this.currentTitle === this.title
    },
  },
  template: '\
    <article class="acd-section" :class="{ active: isActive }">\
      <header class="acd-header" @click="selected">${title}</header>\
      <div class="acd-content" v-if="mobile && isActive" v-html="content" />\
    </article>',
})

export default {
  selector: '.accordeon',
  vm: (el, store) => {
    return new Vue({
      el,
      data: {
        current: 0,
        titles: [],
        contents: [],
        mobile: isMobile(),
      },
      methods: {
        changeActive: function(target) {
          this.current = this.titles.indexOf(target.textContent)
          Vue.nextTick(function() {
            this.mobile && scrollToElm(target, -100)
          }.bind(this))
        },
      },
      computed: {
        currentTitle: function() {
          return this.titles[this.current]
        },
        content: function() {
          return this.contents.length
            ? this.contents[this.current]
            : 'Loading...'
        }
      },
      mounted: function() {
        this.titles = map(this.$children, 'title')
        this.contents = map(this.$children, 'content')
      },
      components: { Aba },
    })
  }
}
