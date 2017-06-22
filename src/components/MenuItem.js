import Vue from 'vue'
import $ from 'jquery'
import { startsWith } from 'lodash'
import { scrollToId } from '../utils/scroll'

export default {
  selector: '.main-menu .menu-item[href^="#"], \
            .header-menu .menu-item[href^="#"]',
  vm: (el, store) => {
    new Vue({
      el,
      name: 'MenuItem',
      data: {
        active: false,
        hash: '',
      },
      methods: {
        update: function({ currentSection }) {
          this.active = this.hash === currentSection
        },
        clicked: function({ target }) {
          store.dispatch({ name: 'CLOSE_MENU' })
          scrollToId(this.hash)
        },
      },
      mounted: function() {
        this.hash = this.$el.hash.substring(1)
        store.subscribe(this.update.bind(this), 'currentSection')
      },
    })
  }
}
