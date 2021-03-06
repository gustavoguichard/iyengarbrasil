import Vue from 'vue'
import $ from 'jquery'
import { map } from 'lodash'
import store from './utils/store'
import BodyControls from './BodyControls'
import * as Components from './components'

class Site {
  constructor(window) {
    document.documentElement.classList.add('js')
    const controls = new BodyControls(store)
    this.initComponents()
  }

  initComponents() {
    map(Components, Component => {
      map($(Component.selector), el => Component.vm(el, store))
    })
  }
}

$(jQuery => new Site(window))
