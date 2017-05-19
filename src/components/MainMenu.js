import $ from 'jquery'
import { mapValues } from 'lodash'
import { classNames, not } from '../utils/helpers'

export default class MainMenu {
  static get selector() {
    return '.main-menu'
  }

  constructor(el, store) {
    this.el = el
    this.store = store

    this.listeners()

    store.subscribe(this.update.bind(this), 'menuOpen', 'menuVisible')
  }

  update({ menuOpen, menuVisible }) {
    const possibleClasses = {
      'menu-open': menuOpen,
      'menu-visible': menuVisible,
    }
    const removeClasses = mapValues(possibleClasses, not)
    $(this.el)
      .addClass(classNames(possibleClasses))
      .removeClass(classNames(removeClasses))
  }

  listeners() {
    $('.menu-opener', this.el).on('click', this.toggleMenu.bind(this))
  }

  toggleMenu(event) {
    this.store.dispatch({ name: 'TOGGLE_MENU' })
    event.preventDefault()
  }
}
