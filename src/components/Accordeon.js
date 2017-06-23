import Vue from 'vue'
import { map } from 'lodash'
import isMobile from '../utils/isMobile'
import { scrollToElm } from '../utils/scroll'
import AccordeonSection from '../vuecomponents/AccordeonSection'

export default {
  selector: '.accordeon',
  vm: (el) => {
    return new Vue({
      el,
      name: 'Accordeon',
      data: {
        current: 0,
        titles: [],
        contents: [],
        mobile: isMobile(),
      },
      methods: {
        changeActive: function(target) {
          this.current = this.titles.indexOf(target.textContent)
          Vue.nextTick(function() {
            this.mobile && scrollToElm(target, -100)
          }.bind(this))
        },
      },
      computed: {
        currentTitle: function() {
          return this.titles[this.current]
        },
        content: function() {
          return this.contents.length
            ? this.contents[this.current]
            : 'Loading...'
        }
      },
      mounted: function() {
        this.titles = map(this.$children, 'title')
        this.contents = map(this.$children, 'content')
      },
      components: { AccordeonSection },
    })
  }
}
