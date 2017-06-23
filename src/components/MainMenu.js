import Vue from 'vue'
import MenuLink from '../vuecomponents/MenuLink'

export default {
  selector: '.main-menu',
  vm: (el) => {
    return new Vue({
      el,
      name: 'MainMenu',
      data: {
        open: false,
        visible: false,
      },
      methods: {
        update: function({ menuOpen, menuVisible }) {
          this.open = menuOpen
          this.visible = menuVisible
        },
        toggleMenu: function() {
          this.$store.dispatch({ name: 'TOGGLE_MENU' })
        },
      },
      computed: {
        classObj: function() {
          return {
            'menu-open': this.open,
            'menu-visible': this.visible,
          }
        },
      },
      mounted: function() {
        this.$store.subscribe(this.update.bind(this), 'menuOpen', 'menuVisible')
        this.update(this.$store.getState())
      },
      components: { MenuLink },
    })
  }
}
