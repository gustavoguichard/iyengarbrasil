import { isAbove } from '../utils/onScreen'

export default class MainMenu {
  constructor(el, store) {
    this.el = el
    this.store = store

    store.subscribe(this.update.bind(this), 'windowY', 'windowH')
  }

  update({ windowY, windowH, menuVisible }) {
    const shouldHide = isAbove(this.el, 150)
    const name = shouldHide ? 'HIDE_MENU' : 'SHOW_MENU'
    shouldHide === menuVisible && this.store.dispatch({ name })
  }
}
