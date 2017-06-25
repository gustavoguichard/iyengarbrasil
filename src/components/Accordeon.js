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
        contents: [{ title: '', content: 'Loading...' }],
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
        titles: function() {
          return map(this.contents, 'title')
        },
        currentTitle: function() {
          return this.contents[this.current].title
        },
        currentContent: function() {
          return this.contents[this.current].content
        }
      },
      mounted: function() {
        this.contents = map(this.$children, ({ content, title }) => ({ content, title }))
      },
      components: { AccordeonSection },
    })
  }
}
