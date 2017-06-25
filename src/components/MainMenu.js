import Vue from 'vue'
import { mapState } from 'vuex'
import MenuLink from '../vuecomponents/MenuLink'

export default {
  selector: '.main-menu',
  vm: (el, store) => {
    return new Vue({
      el, store,
      name: 'MainMenu',
      methods: {
        toggleMenu: function() {
          this.$store.commit('toggleMenu')
        },
      },
      computed: {
        ...mapState(['menuOpen', 'menuVisible']),
        classObj() {
          return {
            'menu-open': this.menuOpen,
            'menu-visible': this.menuVisible,
          }
        },
      },
      components: { MenuLink },
    })
  }
}
