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

    this.listeners()
  }

  update({ currentSection }) {
    this.hash === currentSection
      ? $(this.el).addClass('active')
      : $(this.el).removeClass('active')
  }

  listeners() {
    $(this.el).on('click', ev => {
      this.store.dispatch({ name: 'CLOSE_MENU' })
    })
  }
}
