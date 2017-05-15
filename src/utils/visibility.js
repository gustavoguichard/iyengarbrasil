import { reduce, toPlainObject, has } from 'lodash'

const api = {
  hidden: 'visibilitychange',
  msHidden: 'msvisibilitychange',
  webkitHidden: 'webkitvisibilitychange',
}

export default reduce(api, (sum, val, key) =>
  has(toPlainObject(document), key) ? { hidden: key, change: val } : sum
, {})
