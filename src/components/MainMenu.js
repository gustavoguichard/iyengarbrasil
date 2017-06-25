import Vue from 'vue'
import MenuLink from '../vuecomponents/MenuLink'

export default {
  selector: '.main-menu',
  vm: (el) => {
    return new Vue({
      el,
      name: 'MainMenu',
      data: {
        classObj: {
          'menu-open': false,
          'menu-visible': false,
        },
      },
      methods: {
        update: function({ menuOpen, menuVisible }) {
          this.classObj = {
            'menu-open': menuOpen,
            'menu-visible': menuVisible,
          }
        },
        toggleMenu: function() {
          this.$store.dispatch({ name: 'TOGGLE_MENU' })
        },
      },
      mounted: function() {
        this.$store.subscribe(this.update, 'menuOpen', 'menuVisible')
        this.update(this.$store.getState())
      },
      components: { MenuLink },
    })
  }
}
