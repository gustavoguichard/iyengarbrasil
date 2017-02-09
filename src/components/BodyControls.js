import $ from 'jquery'
import { debounce } from 'lodash'

export default class BodyControls {
  constructor(el, store) {
    this.el = el
    this.store = store

    this.listeners()
  }

  listeners() {
    $(window).on('resize', debounce(this.windowResized, 150))
    $(window).on('scroll', debounce(this.windowScrolled, 150))

    setTimeout(this.windowResized, 100)
    setTimeout(this.windowScrolled, 100)
  }

  windowResized(ev) {
    this.store.dispatch({
      name: 'WINDOW_RESIZED',
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  windowScrolled(ev) {
    this.store.dispatch({
      name: 'WINDOW_SCROLLED',
      position: window.scrollY,
    })
  }

}
