import $ from 'jquery'
import { debounce, split } from 'lodash'

export default class MainItem {
  constructor(el, store) {
    this.el = el
    this.store = store
    this.hash = split(el.getAttribute('href'), '#')[1]

    if(this.hash) {
      const slowUpdate = debounce(this.update.bind(this), 150)
      store.subscribe(slowUpdate, 'currentSection')
    }
  }

  update() {
    const { currentSection } = this.store.getState()
    if(this.hash === currentSection) {
      $(this.el).addClass('active')
    } else {
      $(this.el).removeClass('active')
    }
  }
}
