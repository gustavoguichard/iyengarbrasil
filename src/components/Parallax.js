import Vue from 'vue'
import { mapState } from 'vuex'
import isMobile from '../utils/isMobile'
import { isAbove } from '../utils/scroll'
import MenuLink from '../vuecomponents/MenuLink'
import Slider from '../vuecomponents/Slider'

const SLIDER_TIME = 5

export default {
  selector: '.sct-parallax',
  vm: (el, store) => {
    return new Vue({
      el, store,
      name: 'Parallax',
      data: {
        mobile: isMobile(),
      },
      methods: {
        scrolled: function() {
          if(this.$el.dataset.main) {
            this.$store.commit(
              isAbove(this.$el, 150) ? 'hideMenu' : 'showMenu'
            )
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
      },
      computed: {
        ...mapState(['menuVisible', 'windowH', 'windowY']),
      },
      components: { MenuLink, Slider },
    })
  }
}
