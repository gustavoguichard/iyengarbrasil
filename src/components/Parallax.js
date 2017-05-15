import $ from 'jquery'

export default class Parallax {
  constructor(el, store) {
    this.el = el
    $(this.el).prepend('<div class="parallax-cover" />')
  }
}
