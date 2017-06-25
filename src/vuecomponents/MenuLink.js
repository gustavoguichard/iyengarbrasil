import Vue from 'vue'
import { scrollToId } from '../utils/scroll'

export default Vue.component('menu-link', {
  name: 'MenuLink',
  data: function() {
    return {
      active: false,
    }
  },
  props: ['href', 'title'],
  template: '<a :href="href" :class="{ active }" @click="clicked">${title}</a>',
  methods: {
    update: function({ currentSection }) {
      this.active = this.$el.hash.substring(1) === currentSection
    },
    clicked: function(event) {
      this.$store.dispatch({ name: 'CLOSE_MENU' })
      if(this.$props.href === this.$el.hash) {
        scrollToId(this.$el.hash.substring(1))
      }
    },
  },
  mounted: function() {
    this.$store.subscribe(this.update, 'currentSection')
  },
})
