import $ from 'jquery'
import { floor } from 'lodash'

export default class Slider {
  constructor(el, store) {
    this.el = el
    this.store = store

    store.subscribe(this.update.bind(this), 'ticks')

    this.mountSlider()
  }

  mountSlider() {
    this.current = 0
    this.container = $(this.el).find('.images-container')
    this.time = this.el.dataset['time'] || 5

    const images = $('.slider-img', this.container)
    this.length = images.length

    images.first().addClass('active')
  }

  update() {
    const { ticks } = this.store.getState()
    const newCurrent = floor(ticks / this.time) % this.length

    if(this.current !== newCurrent) {
      this.current = newCurrent
      this.stepSlider(newCurrent)
    }
  }

  stepSlider(newCurrent) {
    const currEl = $('.active', this.container)
    const nextEl = $('.slider-img', this.container).eq(newCurrent)
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
