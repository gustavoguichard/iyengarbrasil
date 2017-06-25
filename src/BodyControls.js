import $ from 'jquery'
import { debounce } from 'lodash'
import visibility from './utils/visibility'
import { scrollToElm } from './utils/scroll'

export default class BodyControls {
  constructor(store) {
    this.store = store
    this.listeners()
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

  visibilityChanged() {
    this.store.commit('changedTab', !document[visibility.hidden])
  }

  windowResized() {
    this.store.commit('windowResized', {
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  windowScrolled() {
    this.store.commit('windowScrolled', window.scrollY)
  }

}
