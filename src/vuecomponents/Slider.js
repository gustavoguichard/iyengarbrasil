import Vue from 'vue'
import { mapState } from 'vuex'
import { floor } from 'lodash'

const SLIDER_TIME = 5
const template = `
  <transition-group name="slide" class="images-container">
    <div v-for="(image, index) in imageUrls" key="{{index}}" v-show="current === index" :style="bgImage(image)" class="slider-img"></div>
    <div key="shadow" class="parallax-cover"></div>
  </transition-group>`

export default Vue.component('slider', {
  template,
  name: 'Slider',
  props: ['images'],
  data: function() {
    return {
      current: 0,
      ticks: 0,
    }
  },
  methods: {
    tick: function() {
      if(this.isSlider) {
        this.ticks++
        this.current = floor(this.ticks / SLIDER_TIME) % this.length
      }
    },
    bgImage: function(image) {
      return {
        'background-image': `url(${image})`,
      }
    },
  },
  watch: {
    activeTab: function() {
      if(this.activeTab && !this.ticker) {
        this.ticker = setInterval(this.tick, 1000)
      } else if(!this.activeTab) {
        this.ticker = clearInterval(this.ticker)
      }
    }
  },
  computed: {
    ...mapState(['activeTab']),
    isSlider: function() {
      return this.length > 1
    },
    imageUrls: function() {
      return this.images ? this.images.split(',') : []
    },
    length: function() {
      return this.imageUrls.length
    },
  },
})
