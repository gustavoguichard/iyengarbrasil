import $ from 'jquery'
import { max } from 'lodash'

export const scrollToId = (id, offset, animate = true) => {
  const elm = document.getElementById(id)
  scrollToElm(elm, offset, animate)
}

export const scrollToElm = (elm, offset = 0, animate = true) => {
  if (elm) {
    const { top } = elm.getBoundingClientRect()
    const scrollY = window.scrollY + top + offset
    scrollTo(scrollY, animate)
  } else {
    scrollTo(offset, animate)
  }
}

export const scrollTo = (top = 0, animate = true) => {
  $('html, body').animate({ scrollTop: `${top}px` }, animate ? 'fast' : 0)
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
