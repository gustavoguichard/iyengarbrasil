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

export const isOnScreen = (elm, offset = 0, mode = 'visible') => {
  const { bottom, top } = elm.getBoundingClientRect()
  const wHeight = max([document.documentElement.clientHeight, window.innerHeight])
  const visibleAbove = bottom - offset >= 0
  const visibleBelow = top - wHeight + offset < 0

  return mode === 'above'
    ? visibleAbove
    : (mode === 'below'
        ? visibleBelow
        : visibleAbove && visibleBelow
      )
}

export const isBelow = (elm, offset = 0) => isOnScreen(elm, offset, 'below')
export const isAbove = (elm, offset = 0) => isOnScreen(elm, offset, 'above')
