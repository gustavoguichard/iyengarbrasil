import Vue from 'vue'
import { random } from 'lodash'

export default {
  selector: '.photo',
  vm: (el, store) => {
    new Vue({
      el,
      name: 'Photo',
      data: {
        styleObj: {
          transform: `rotate(${random(-20, 20) / 10}deg)`,
        }
      },
    })
  }
}
