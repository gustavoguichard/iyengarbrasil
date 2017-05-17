import $ from 'jquery'

export default class ButtonCTA {
  constructor(el, store) {
    this.el = el
    this.store = store

    this.mount()
    this.listeners()

    store.subscribe(this.update.bind(this), 'ctaOpen')
  }

  mount() {
    this.el.classList.add('js')
  }

  listeners() {
    $(this.el).on('click', ev => {
      this.store.dispatch({ name: 'CTA_CLICKED' })
      ev.preventDefault()
    })
  }

  update({ ctaOpen }) {
    ctaOpen && this.el.remove()
  }
}
