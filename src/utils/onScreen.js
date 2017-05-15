const isVisible = (y, screenLimit) => y >= 0 && y < screenLimit

export default (obj, windowHeight, windowY = 0, offset = 0) => {
  if (typeof obj.getBoundingClientRect !== "undefined") {
    const { bottom, top } = obj.getBoundingClientRect()
    const screenLimit = windowY + windowHeight
    return isVisible(top, screenLimit) || isVisible(bottom, screenLimit)
  }
  return true
}
