import {
  isArray, reduce, map, isObject, isString, flattenDeep
} from 'lodash'

// elm :: String -> Object -> String || Array -> String
// elm('a', {href: '#'}, 'Tile') -> <a href="#">Title</a>
// elm('img', {src: '#'}) -> <img src="#" />
export const elm = (tag, props, children) => {
  let html = `<${tag}`
  if (props) html += reduce(props, (acc, value, key) =>
      value ? `${acc} ${key}="${value}"` : acc, '')
  if (children || children === '') {
    html += '>'
    html += isArray(children) ? children.join('') : children
    html += `</${tag}>`
  } else {
    html += ' />'
  }
  return html
}

export const classNames = (...args) => {
  const sum = map(args, arg => {
    if (isString(arg) || isArray(arg)) {
      return arg
    } else if (isObject(arg)) {
      return reduce(arg, (acc, value, key) =>
        !!value ? [...acc, key] : acc
      , [])
    }
  })
  return flattenDeep(sum).join(' ')
}

export const not = (value) => !value
