import $ from 'jquery'

export default class Table {
  static get selector() {
    return '.tablepress'
  }

  constructor(el, store) {
    $(el).wrap('<div class="responsive-table">')
  }
}
