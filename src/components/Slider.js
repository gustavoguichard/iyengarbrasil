import $ from 'jquery'
import { floor } from 'lodash'

export default class Slider {
  static get selector() {
    return '.sct-slideshow'
  }

  constructor(el, store) {
    this.el = el
    this.store = store

    store.subscribe(this.update.bind(this), 'ticks')

    this.mount()
  }

  mount() {
    this.current = 0
    this.container = $(this.el).find('.images-container')
    this.time = this.el.dataset['time'] || 5

    const images = $('.slider-img', this.container)
    this.length = images.length

    images.first().addClass('active')
  }

  update({ ticks }) {
    const index = floor(ticks / this.time) % this.length

    if(this.current !== index) {
      this.current = index
      this.stepSlider(index)
    }
  }

  stepSlider(index) {
    const currEl = $('.active', this.container)
    const nextEl = $('.slider-img', this.container).eq(index)
    currEl
      .removeClass('active')
      .addClass('fading')
      .fadeOut({
        complete: () => currEl.removeClass('fading')
      })
    nextEl
      .show()
      .addClass('active')
  }
}
