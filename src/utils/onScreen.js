import { max } from 'lodash'

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
