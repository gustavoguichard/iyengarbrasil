import $ from 'jquery'
import { map, uniqueId, find } from 'lodash'
import * as isMobile from '../utils/isMobile'
import { classNames } from '../utils/helpers'

export default class Accordeon {
  constructor(el, store) {
    this.el = el
    this.store = store

    store.subscribe(this.update.bind(this), 'accordeons')
    this.mount()
    this.listeners()
  }

  mount() {
    this.id = uniqueId()

    const mobile = isMobile.any()
    const classes = classNames({
      desktop: !mobile,
      mobile,
    })
    $(this.el).addClass(classes)

    map($('.acd-header', this.el), (elm, index) => {
      $(elm).data('index', index)
    })

    !mobile && $(this.el).append('<div class="acd-dynamic-content">')

    this.store.dispatch({
      name: 'SUBSCRIBE_ACCORDEON',
      id: this.id,
    })
  }

  listeners() {
    $('.acd-header', this.el).on('click', event => {
      const index = $(event.currentTarget).data('index')
      this.store.dispatch({
        name: 'UPDATE_ACCORDEON',
        id: this.id,
        index,
      })
    })
  }

  update({ accordeons }) {
    const { index } = find(accordeons, acc => acc.id === this.id)
    $('.acd-section', this.el).removeClass('active')
    const current = $('.acd-section', this.el).eq(index)
    current.addClass('active')
    const content = current.find('.acd-content').html()
    $('.acd-dynamic-content', this.el).html(content)
  }
}