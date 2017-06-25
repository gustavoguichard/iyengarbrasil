import Vue from 'vue'
import { floor } from 'lodash'
import isMobile from '../utils/isMobile'
import { isAbove } from '../utils/scroll'
import MenuLink from '../vuecomponents/MenuLink'

export default {
  selector: '.sct-parallax',
  vm: (el) => {
    return new Vue({
      el,
      name: 'Parallax',
      data: {
        mobile: isMobile(),
        length: 1,
        current: 0,
      },
      methods: {
        update: function({ ticks }) {
          const time = this.$el.dataset.time || 5
          const index = floor(ticks / time) % this.length
          if(this.current !== index) {
            this.current = index
          }
        },
        scrolled: function({ windowY, windowH, menuVisible }) {
          const shouldHide = isAbove(this.$el, 150)
          const name = shouldHide ? 'HIDE_MENU' : 'SHOW_MENU'
          shouldHide === menuVisible && this.$store.dispatch({ name })
        },
      },
      computed: {
        isSlider: function () {
          return this.length > 1
        },
      },
      mounted: function() {
        this.length = this.$el.getElementsByClassName('slider-img').length
        if(this.isSlider) {
          this.$store.subscribe(this.update, 'ticks')
        }
        if(this.$el.dataset.main) {
          this.$store.subscribe(this.scrolled, 'windowY', 'windowH')
        }
      },
      components: { MenuLink },
    })
  }
}
