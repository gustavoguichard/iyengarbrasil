import Vue from 'vue'
import { mapState } from 'vuex'
import { scrollToId } from '../utils/scroll'

const template = `<a :href="href" :class="{ active: isActive, 'is-home-page': isHomePage }" @click="clicked">{{title}}</a>`

export default Vue.component('menu-link', {
  template,
  name: 'MenuLink',
  props: ['href', 'title', 'is-home'],
  mounted: function() {
    if(this.isHomePage) {
      this.url = this.$el.hash || this.$el.href
      this.$el.href = this.url
    }
  },
  computed: {
    ...mapState(['currentSection']),
    isHomePage() {
      return !!parseInt(this.$props.isHome)
    },
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
      if(this.url === this.$el.hash) {
        scrollToId(this.hash())
      }
    },
  },
})
