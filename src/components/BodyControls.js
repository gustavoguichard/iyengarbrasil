import $ from 'jquery'
import { debounce } from 'lodash'
import visibility from '../utils/visibility'

export default class BodyControls {
  constructor(el, store) {
    this.el = el
    this.store = store
    this.ticker = null
    this.visibility = null

    this.listeners()
  }

  listeners() {
    $(window).on('resize', debounce(this.windowResized, 150))
    $(window).on('scroll', debounce(this.windowScrolled, 150))
    this.visibility = visibility(this.handleVisibilityChange.bind(this))

    setTimeout(this.handleVisibilityChange.bind(this), 100)
    setTimeout(this.windowResized, 100)
    setTimeout(this.windowScrolled, 100)
  }

  activateTick() {
    this.ticker = setInterval(this.tick, 1000)
  }

  deactivateTick() {
    clearInterval(this.ticker)
    this.ticker = null
  }

  handleVisibilityChange() {
    document[this.visibility.hidden]
      ? this.deactivateTick()
      : this.activateTick()
  }

  tick() {
    this.store.dispatch({
      name: 'TICK',
      silent: true,
    })
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
