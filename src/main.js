import $ from 'jquery'
import { map, filter } from 'lodash'
import { createStore } from './utils/redux'
import reducer from './utils/reducer'
import BodyControls from './components/BodyControls'
import MainMenu from './components/MainMenu'
import MainHeader from './components/MainHeader'
import Parallax from './components/Parallax'
import Slider from './components/Slider'
import Photo from './components/Photo'

class Site {
  constructor(window) {
    $('html').addClass('js')

    this.initComponents()
  }

  initComponents() {
    window.store = createStore(reducer)
    map(COMPONENTS, (Component, selector) => {
      map($(selector), el => new Component(el, store))
    })
  }
}

const COMPONENTS = {
  'body': BodyControls,
  '.main-menu': MainMenu,
  '.sct-slideshow': Slider,
  '.sct-parallax': Parallax,
  '.main-header': MainHeader,
  'img.photo': Photo,
  // '.menu-link, .menu-shadow, [data-open-menu]': MenuLink,
}

$(jQuery => new Site(window))
