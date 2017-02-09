import {
  keys, intersection, filter, isEqual,
} from 'lodash'

export const createStore = reducer => {
  let state = {}
  let listeners = []
  const getState = () => state

  const dispatch = action => {
    const prevState = state
    state = reducer(state, action)
    const changed = filter(keys(state), key =>
      !isEqual(prevState[key], state[key]))
    if(action.name && process.env.NODE_ENV == 'development') {
      consoleGroup(prevState, 'Prev State', 'green')
      consoleGroup(action, 'Action', '#f66')
      consoleGroup(state, 'Next State', '#f66')
      consoleGroup(changed, 'Changed Values', 'gray')
    }
    listeners.forEach(lst => {
      if(lst.keys.length === 0 || !!intersection(lst.keys, changed).length) lst.callback()
    })
  }

  const subscribe = (callback, ...keys) => {
    const listener = { callback, keys }
    listeners = [ ...listeners, listener ]
    return () => {
      listeners = listeners.filter(lst => lst.callback !== listener.callback)
    }
  }

  dispatch({})

  return { getState, dispatch, subscribe }
}

const consoleGroup = (log, title, color) => {
  console.group(`%c${title}`, `color: ${color};`);console.log(log);console.groupEnd();
}
