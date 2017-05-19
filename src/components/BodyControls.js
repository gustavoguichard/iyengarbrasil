import $ from 'jquery'
import { debounce } from 'lodash'
import visibility from '../utils/visibility'

export default class BodyControls {
  static get selector() {
    return 'body'
  }

  constructor(el, store) {
    this.el = el
    this.store = store
    this.ticker = null

    this.listeners()

    store.subscribe(this.update.bind(this), 'activeTab')
  }

  listeners() {
    $(window).on('resize', debounce(this.windowResized.bind(this), 150))
    $(window).on('scroll', debounce(this.windowScrolled.bind(this), 150))
    $(document).on(visibility.change, this.visibilityChanged.bind(this))

    setTimeout(() => {
      this.visibilityChanged()
      this.windowResized()
      this.windowScrolled()
    }, 100)
  }

  update({ activeTab }) {
    activeTab
      ? this.ticker = setInterval(this.tick.bind(this), 1000)
      : this.ticker = clearInterval(this.ticker)
  }

  tick() {
    this.store.dispatch({
      name: 'TICK',
      silent: true,
    })
  }

  visibilityChanged() {
    this.store.dispatch({
      name: 'CHANGED_TAB',
      active: !document[visibility.hidden],
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
