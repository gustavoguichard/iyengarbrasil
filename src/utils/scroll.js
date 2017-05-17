import $ from 'jquery'
import { max } from 'lodash'

export const scrollToId = (id, offset) => {
  const elm = document.getElementById(id)
  scrollToElm(elm, offset)
}

export const scrollToElm = (elm, offset = 0) => {
  if (elm) {
    const { top } = elm.getBoundingClientRect()
    const scrollY = window.scrollY + top + offset
    scrollTo(scrollY)
  } else {
    scrollTo(offset)
  }
}

export const scrollTo = (top = 0) => {
  $('html, body').animate({ scrollTop: `${top}px` }, 'fast')
}
