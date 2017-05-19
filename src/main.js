import $ from 'jquery'
import { map } from 'lodash'
import { createStore } from './utils/redux'
import reducer from './utils/reducer'
import * as Components from './components'

class Site {
  constructor(window) {
    document.documentElement.classList.add('js')
    this.initComponents()
  }

  initComponents() {
    const store = createStore(reducer)
    map(Components, Component => {
      map($(Component.selector), el => new Component(el, store))
    })
  }
}

$(jQuery => new Site(window))
