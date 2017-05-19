import $ from 'jquery'
import isMobile from '../utils/isMobile'

export default class Parallax {
  static get selector() {
    return '.sct-parallax'
  }

  constructor(el, store) {
    this.el = $(el)
    this.el.prepend('<div class="parallax-cover" />')

    isMobile() && this.el.addClass('mobile')
  }
}
