import $ from 'jquery'
import { map, uniqueId, find } from 'lodash'
import * as isMobile from '../utils/isMobile'
import { scrollToElm } from '../utils/scroll'
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
    this.mobile = isMobile.any()

    const classes = classNames({
      desktop: !this.mobile,
      mobile: this.mobile,
    })
    $(this.el).addClass(classes)

    map($('.acd-header', this.el), (elm, index) => {
      $(elm).data('index', index)
    })

    !this.mobile && $(this.el).append('<div class="acd-dynamic-content">')

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
      this.mobile && scrollToElm(event.currentTarget, -100)
    })
  }

  update({ accordeons }) {
    const { index } = find(accordeons, acc => acc.id === this.id)
    $('.acd-section', this.el).removeClass('active')
    const current = $('.acd-section', this.el).eq(index)
    current.addClass('active')
    if (!this.mobile) {
      const content = current.find('.acd-content').html()
      $('.acd-dynamic-content', this.el).html(content)
    }
  }
}
