import Vue from 'vue'

export default Vue.component('accordeon-section', {
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
  template: '\
    <article class="acd-section" :class="{ active: isActive }">\
      <header class="acd-header" @click="selected">${title}</header>\
      <div class="acd-content" v-if="mobile && isActive" v-html="content" />\
    </article>',
})
