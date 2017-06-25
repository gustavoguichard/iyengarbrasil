import Vue from 'vue'

export default {
  selector: '.bt-cta',
  vm: (el) => {
    return new Vue({
      el,
      name: 'ButtonCTA',
      data: {
        show: true,
      },
      methods: {
        clicked: function() {
          this.$store.dispatch({ name: 'CTA_CLICKED' })
        },
        update: function({ ctaOpen }) {
          this.show = !ctaOpen
        },
      },
      mounted: function() {
        this.show = !this.$store.getState().ctaOpen
        this.$store.subscribe(this.update, 'ctaOpen')
      },
    })
  }
}
