import $ from 'jquery'
import { map } from 'lodash'
import { createStore } from './utils/redux'
import reducer from './utils/reducer'

import BodyControls from './components/BodyControls'
import MainHeader from './components/MainHeader'
import MainMenu from './components/MainMenu'
import MenuItem from './components/MenuItem'
import Parallax from './components/Parallax'
import Photo from './components/Photo'
import SectionHeader from './components/SectionHeader'
import Slider from './components/Slider'

class Site {
  constructor(window) {
    $('html').addClass('js')

    this.initComponents()
  }

  initComponents() {
    const store = createStore(reducer)
    map(COMPONENTS, (Component, selector) => {
      map($(selector), el => new Component(el, store))
    })
  }
}

const COMPONENTS = {
  'body': BodyControls,
  '.main-header': MainHeader,
  '.main-menu': MainMenu,
  '.main-menu .menu-item[href^="#"]': MenuItem,
  '.sct-parallax': Parallax,
  'img.photo': Photo,
  '.sct-slideshow': Slider,
  '.section-header[id]': SectionHeader,
}

$(jQuery => new Site(window))
