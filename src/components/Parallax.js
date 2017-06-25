import Vue from 'vue'
import { mapState } from 'vuex'
import { floor } from 'lodash'
import isMobile from '../utils/isMobile'
import { isAbove } from '../utils/scroll'
import MenuLink from '../vuecomponents/MenuLink'

const SLIDER_TIME = 5

export default {
  selector: '.sct-parallax',
  vm: (el, store) => {
    return new Vue({
      el, store,
      name: 'Parallax',
      data: {
        mobile: isMobile(),
        length: 1,
        current: 0,
        ticks: 0,
      },
      methods: {
        scrolled: function() {
          if(this.$el.dataset.main) {
            this.$store.commit(
              isAbove(this.$el, 150) ? 'hideMenu' : 'showMenu'
            )
          }
        },
        tick: function() {
          if(this.isSlider) {
            this.ticks++
            this.current = floor(this.ticks / SLIDER_TIME) % this.length
          }
        },
      },
      watch: {
        windowY: function() {
          this.scrolled()
        },
        windowH: function() {
          this.scrolled()
        },
        activeTab: function() {
          if(this.activeTab && !this.ticker) {
            this.ticker = setInterval(this.tick, 1000)
          } else if(!this.activeTab) {
            this.ticker = clearInterval(this.ticker)
          }
        }
      },
      computed: {
        ...mapState(['activeTab', 'menuVisible', 'windowH', 'windowY']),
        isSlider: function () {
          return this.length > 1
        },
      },
      mounted: function() {
        this.length = this.$el.getElementsByClassName('slider-img').length
      },
      components: { MenuLink },
    })
  }
}
