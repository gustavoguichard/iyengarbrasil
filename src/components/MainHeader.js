import $ from 'jquery'
import isOnScreen from '../utils/onScreen'

export default class MainMenu {
  constructor(el, store) {
    this.el = el
    this.store = store
    this.visible = !store.getState().menuVisible

    store.subscribe(this.update.bind(this), 'windowY', 'windowHeight')
  }

  update() {
    const { windowY, windowHeight, menuVisible } = this.store.getState()
    const isVisible = isOnScreen(this.el, windowHeight, windowY)
    if(isVisible !== this.visible) {
      this.visible = isVisible
      this.store.dispatch({ name: isVisible ? 'HIDE_MENU' : 'SHOW_MENU' })
    }
  }
}
