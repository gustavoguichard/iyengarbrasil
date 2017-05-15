import $ from 'jquery'
import { random } from 'lodash'

export default class Photo {
  constructor(el, store) {
    this.el = el

    this.mountPhoto()
  }

  mountPhoto() {
    const rand = random(-20, 20) / 10;
    this.el.style.transform = `rotate(${rand}deg)`;
  }
}
