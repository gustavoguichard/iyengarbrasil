import $ from 'jquery'

export default class MainMenu {
  constructor(el, store) {
    this.el = el
    this.store = store

    store.subscribe(this.update.bind(this), 'menuOpen')
    this.listeners()
  }

  update() {
    const { menuOpen } = this.store.getState()
    if ( menuOpen ) {
      $(this.el).addClass('menu-open')
    } else {
      $(this.el).removeClass('menu-open')
    }
  }

  listeners() {
    $('.menu-opener', this.el).on('click', this.toggleMenu.bind(this))
  }

  toggleMenu(event) {
    this.store.dispatch({ name: 'TOGGLE_MENU' })
    event.preventDefault()
  }
}
