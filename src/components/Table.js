import $ from 'jquery'

export default class Table {
  constructor(el, store) {
    $(el).wrap('<div class="responsive-table">')
  }
}
