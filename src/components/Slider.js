import $ from 'jquery'

export default class Slider {
  constructor(el, store) {
    this.el = el
    this.store = store

    store.subscribe(this.update.bind(this), 'ticks')
  }

  update() {
    const { ticks } = this.store.getState()
  }

}
