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
    Vue.mixin({
      created: function() {
        this.$store = store
      }
    })
    map(Components, Component => {
      map($(Component.selector), el => {
        Component.vm
          ? Component.vm(el)
          : new Component(el, store)
      })
    })
  }
}


$(jQuery => new Site(window))
