import Vue from 'vue'
import { mapState } from 'vuex'
import { scrollToId } from '../utils/scroll'

export default Vue.component('menu-link', {
  name: 'MenuLink',
  props: ['href', 'title'],
  template: '<a :href="href" :class="{ active: isActive }" @click="clicked">${title}</a>',
  computed: {
    ...mapState(['currentSection']),
    isActive() {
      return this.currentSection === this.hash()
    },
  },
  methods: {
    hash() {
      return this.$el ? this.$el.hash.substring(1) : ''
    },
    clicked(event) {
      this.$store.commit('closeMenu')
      if(this.$props.href === this.$el.hash) {
        scrollToId(this.hash())
      }
    },
  },
})
