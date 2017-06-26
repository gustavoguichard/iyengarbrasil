export const Android = () => !!navigator.userAgent.match(/Android/i)

export const BlackBerry = () => !!navigator.userAgent.match(/BlackBerry/i)

export const iOS = () => !!navigator.userAgent.match(/iPhone|iPad|iPod/i)

export const Opera = () => !!navigator.userAgent.match(/Opera Mini/i)

export const Windows = () => !!navigator.userAgent.match(/IEMobile/i)

export default () => (
  Android() ||
  BlackBerry() ||
  iOS() ||
  Opera() ||
  Windows()
)
