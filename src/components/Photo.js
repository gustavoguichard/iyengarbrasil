import $ from 'jquery'
import { random } from 'lodash'

export default class Photo {
  constructor(el, store) {
    const rand = random(-20, 20) / 10;
    el.style.transform = `rotate(${rand}deg)`;
  }
}
