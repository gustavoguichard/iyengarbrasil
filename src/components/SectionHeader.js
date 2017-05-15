import $ from 'jquery'
import { inRange } from 'lodash'

export default class SectionHeader {
  constructor(el, store) {
    this.el = el
    this.store = store

    store.subscribe(this.update.bind(this), 'windowY')
  }

  update() {
    const { windowY, currentSection } = this.store.getState()
    const fromTop = this.el.getBoundingClientRect().top

    if(fromTop < 150 && currentSection !== this.el.id) {
      this.store.dispatch({
        name: 'CHANGE_SECTION',
        section: this.el.id,
      })
    }
  }
}
