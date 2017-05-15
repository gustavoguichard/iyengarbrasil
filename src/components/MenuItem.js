import $ from 'jquery'
import { debounce } from 'lodash'

export default class MainItem {
  constructor(el, store) {
    this.el = el
    this.store = store
    this.anchor = this.el.getAttribute('href').substring(1)

    if(this.anchor) {
      const slowUpdate = debounce(this.update.bind(this), 150)
      store.subscribe(slowUpdate, 'currentSection')
    }
  }

  update() {
    const { currentSection } = this.store.getState()
    if(this.anchor === currentSection) {
      $(this.el).addClass('active')
    } else {
      $(this.el).removeClass('active')
    }
  }

}
