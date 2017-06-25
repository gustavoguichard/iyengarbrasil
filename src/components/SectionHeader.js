import Vue from 'vue'
import { mapState } from 'vuex'
import { isBelow } from '../utils/scroll'

export default {
  selector: '.section-header[id], #home',
  vm: (el, store) => {
    return new Vue({
      el, store,
      name: 'SectionHeader',
      watch: {
        windowY: function() {
          const belowElm = isBelow(this.$el, this.windowH - 150)
          if(belowElm && this.currentSection !== this.$el.id) {
            this.$store.commit('changeSection', this.$el.id)
          }
        },
      },
      computed: mapState(['windowY', 'windowH', 'currentSection']),
    })
  }
}
