import { inRange, isUndefined } from 'lodash'

export default (obj, windowH, windowY = 0, offset = 0) => {
  if (isUndefined(obj.getBoundingClientRect)) {
    return true
  } else {
    const { bottom, top } = obj.getBoundingClientRect()
    const screenLimit = windowY + windowH
    return inRange(top, offset, screenLimit) || inRange(bottom, offset, screenLimit)
  }
}
