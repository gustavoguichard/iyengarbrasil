import $ from 'jquery'
import { debounce, split, startsWith } from 'lodash'
import { scrollToId } from '../utils/scroll'

export default class MenuItem {
  static get selector() {
    const item = '.menu-item[href^="#"]'
    return `.main-menu ${item}, .header-menu ${item}`
  }

  constructor(el, store) {
    this.el = el
    this.store = store

    this.href = el.getAttribute('href')
    this.hash = split(this.href, '#')[1]
    if(this.hash) {
      const slowUpdate = debounce(this.update.bind(this), 150)
      store.subscribe(slowUpdate, 'currentSection')
    }

    this.listeners()
  }

  update({ currentSection }) {
    this.hash === currentSection
      ? $(this.el).addClass('active')
      : $(this.el).removeClass('active current-menu-item')
  }

  listeners() {
    $(this.el).on('click', ev => {
      this.store.dispatch({ name: 'CLOSE_MENU' })
      if(startsWith(this.href, '#')) {
        scrollToId(this.hash)
      }
    })
  }
}
