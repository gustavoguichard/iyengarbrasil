import $ from 'jquery'
import { scrollToElm } from '../utils/scroll'

export default class CTASection {
  static get selector() {
    return '.cta-section'
  }

  constructor(el, store) {
    this.el = el
    this.store = store

    store.subscribe(this.update.bind(this), 'ctaOpen')
  }

  update({ ctaOpen }) {
    if (ctaOpen) {
      $(this.el).slideDown('fast', () => {
        scrollToElm(this.el, -60)
      })
    }
  }
}
