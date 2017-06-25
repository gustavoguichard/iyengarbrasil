import Vue from 'vue'
import { floor } from 'lodash'
import isMobile from '../utils/isMobile'
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
        }
      },
      computed: {
        isSlider: function () {
          return this.length > 1
        },
      },
      mounted: function() {
        this.length = this.$el.getElementsByClassName('slider-img').length
        if(this.isSlider) {
          this.$store.subscribe(this.update.bind(this), 'ticks')
        }
      },
      components: { MenuLink },
    })
  }
}
