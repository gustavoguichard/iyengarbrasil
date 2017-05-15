import $ from 'jquery'
import * as isMobile from '../utils/isMobile'

export default class Parallax {
  constructor(el, store) {
    this.el = $(this.el)
    this.el.prepend('<div class="parallax-cover" />')

    isMobile.any() && this.el.addClass('mobile')
  }
}
