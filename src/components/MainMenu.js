import $ from 'jquery'
import { compact, join, map, difference, kebabCase } from 'lodash'

export default class MainMenu {
  constructor(el, store) {
    this.el = el
    this.store = store

    store.subscribe(this.update.bind(this), 'menuOpen', 'menuVisible')
    this.listeners()
  }

  update() {
    const { menuOpen, menuVisible } = this.store.getState()
    const possibleClasses = ['menu-open', 'menu-visible']
    const getValidKeysKebab = (v, k) => v ? kebabCase(k) : false
    const newClasses = compact(map({ menuOpen, menuVisible }, getValidKeysKebab))
    const removeClasses = difference(possibleClasses, newClasses)
    $(this.el)
      .addClass(join(newClasses, ' '))
      .removeClass(join(removeClasses, ' '))
  }

  listeners() {
    $('.menu-opener', this.el).on('click', this.toggleMenu.bind(this))
  }

  toggleMenu(event) {
    this.store.dispatch({ name: 'TOGGLE_MENU' })
    event.preventDefault()
  }
}
