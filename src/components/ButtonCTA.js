import $ from 'jquery'
import Vue from 'vue'
import { mapState } from 'vuex'

export default {
  selector: '.bt-cta',
  vm: (el, store) => {
    return new Vue({
      el, store,
      name: 'ButtonCTA',
      methods: {
        clicked: function() {
          this.$store.commit('ctaClicked')
          $('.cta-section').slideDown('fast', function() {
            scrollToElm(this, -60)
          })
        },
      },
      computed: {
        ...mapState(['ctaOpen']),
        show() {
          return !this.ctaOpen
        },
      },
    })
  }
}
