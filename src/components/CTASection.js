import $ from 'jquery'
import { scrollToElm } from '../utils/scroll'

export default class CTASection {
  constructor(el, store) {
    this.el = el
    this.store = store

    this.mount()

    store.subscribe(this.update.bind(this), 'ctaOpen')
  }

  mount() {
    this.el.classList.add('js')
  }

  update({ ctaOpen }) {
    if (ctaOpen) {
      $(this.el).slideDown('fast', () => {
        scrollToElm(this.el, -60)
      })
    }
  }
}
