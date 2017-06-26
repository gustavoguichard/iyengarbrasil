import Vue from 'vue'

const template = `
  <article class="acd-section" :class="{ active: isActive }">
    <header class="acd-header" @click="selected">{{title}}</header>
    <div class="acd-content" v-if="mobile && isActive" v-html="content" />
  </article>`

export default Vue.component('accordeon-section', {
  template,
  props: ['content', 'title', 'mobile', 'currentTitle'],
  methods: {
    selected: function({ target }) {
      this.$emit('selected', target)
    },
  },
  computed: {
    isActive: function() {
      return this.currentTitle === this.title
    },
  },
})
