import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeTab: false,
    currentSection: 'home',
    ctaOpen: false,
    menuOpen: false,
    menuVisible: true,
    windowH: 0,
    windowW: 0,
    windowY: 0,
  },
  mutations: {
    changeSection(state, section) {
      state.currentSection = section
    },
    changedTab(state, active) {
      state.activeTab = active
    },
    closeMenu(state) {
      state.menuOpen = false
    },
    ctaClicked(state) {
      state.ctaOpen = true
    },
    hideMenu(state) {
      state.menuVisible = false
    },
    showMenu(state) {
      state.menuVisible = true
    },
    toggleMenu(state) {
      state.menuOpen = !state.menuOpen
    },
    windowResized(state, payload) {
      state.windowW = payload.width || state.windowW
      state.windowH = payload.height || state.windowH
    },
    windowScrolled(state, position) {
      state.windowY = position
    },
  },
})
