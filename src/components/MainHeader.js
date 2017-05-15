import $ from 'jquery'
import isOnScreen from '../utils/onScreen'

export default class MainMenu {
  constructor(el, store) {
    this.el = el
    this.store = store
    this.visible = false

    store.subscribe(this.update.bind(this), 'windowY', 'windowH')
  }

  update({ windowY, windowH }) {
    const isVisible = isOnScreen(this.el, windowH, windowY)

    if(isVisible !== this.visible) {
      const name = isVisible ? 'HIDE_MENU' : 'SHOW_MENU'

      this.visible = isVisible
      this.store.dispatch({ name })
    }
  }
}
