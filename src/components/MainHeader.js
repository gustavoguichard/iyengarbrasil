import { isAbove } from '../utils/onScreen'

export default class MainMenu {
  constructor(el, store) {
    this.el = el
    this.store = store

    store.subscribe(this.update.bind(this), 'windowY', 'windowH')
  }

  update({ windowY, windowH }) {
    const name = isAbove(this.el, 65) ? 'HIDE_MENU' : 'SHOW_MENU'
    this.store.dispatch({ name })
  }
}
