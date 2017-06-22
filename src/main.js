import Vue from 'vue'
import $ from 'jquery'
import { map } from 'lodash'
import { createStore } from './utils/redux'
import reducer from './utils/reducer'
import * as Components from './components'

Vue.mixin({ delimiters: ['${', '}'] })

class Site {
  constructor(window) {
    document.documentElement.classList.add('js')
    this.initComponents()
  }

  initComponents() {
    const store = createStore(reducer)
    map(Components, Component => {
      return Component.vm
        ? map($(Component.selector), el => Component.vm(el, store))
        : map($(Component.selector), el => new Component(el, store))
    })
  }
}


$(jQuery => new Site(window))
