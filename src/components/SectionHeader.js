import { isBelow } from '../utils/onScreen'

export default class SectionHeader {
  constructor(el, store) {
    this.el = el
    this.store = store

    store.subscribe(this.update.bind(this), 'windowY')
  }

  update({ currentSection, windowH }) {
    const belowElm = isBelow(this.el, windowH - 150)
    if(belowElm && currentSection !== this.el.id) {
      this.store.dispatch({
        name: 'CHANGE_SECTION',
        section: this.el.id,
      })
    }
  }
}
