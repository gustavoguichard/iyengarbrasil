import { isEmpty } from 'lodash'

export const initState = {
  windowWidth: 0,
  windowHeight: 0,
  menuOpen: false,
  windowY: 0,
  ticks: 0,
}

export default (state = initState, action) => {
  state = isEmpty(state) ? initState : state
  switch(action.name) {
    case 'WINDOW_RESIZED':
      return {
        ...state,
        windowWidth: action.width || state.windowWidth,
        windowHeight: action.height || state.windowHeight,
      }
    case 'TOGGLE_MENU':
      return {
        ...state,
        menuOpen: !state.menuOpen,
      }
    case 'WINDOW_SCROLLED':
      return {
        ...state,
        windowY: action.position,
      }
    case 'TICK':
      return {
        ...state,
        ticks: state.ticks + 1,
      }
    default:
      return state
  }
}
