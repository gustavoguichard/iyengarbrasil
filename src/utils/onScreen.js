import { inRange, isUndefined } from 'lodash'

export default (obj, windowH, windowY = 0) => {
  if (isUndefined(obj.getBoundingClientRect)) {
    return true
  } else {
    const { bottom, top } = obj.getBoundingClientRect()
    const screenLimit = windowY + windowH
    return inRange(top, screenLimit) || inRange(bottom, screenLimit)
  }
}
