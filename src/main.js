import Vue from 'vue'
import $ from 'jquery'
import { map } from 'lodash'
import { createStore } from './utils/redux'
import reducer from './utils/reducer'
import * as Components from './components'
import * as VueComp from './vuecomponents'

Vue.mixin({ delimiters: ['${', '}'] })

class Site {
  constructor(window) {
    document.documentElement.classList.add('js')
    this.initComponents()
  }

  initComponents() {
    const store = createStore(reducer)
    window.vuecomponents = map(VueComp, component => {
      return map($(component.selector), el => component.vm(el, store))
    })
    map(Components, Component => {
      map($(Component.selector), el => new Component(el, store))
    })
  }
}


$(jQuery => new Site(window))
