import { isEmpty } from 'lodash'

export const initState = {
  currentSection: 'home',
  menuOpen: false,
  menuVisible: true,
  ticks: 0,
  windowHeight: 0,
  windowWidth: 0,
  windowY: 0,
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
    case 'CHANGE_SECTION':
      return {
        ...state,
        currentSection: action.section,
      }
    case 'TOGGLE_MENU':
      return {
        ...state,
        menuOpen: !state.menuOpen,
      }
    case 'SHOW_MENU':
      return {
        ...state,
        menuVisible: true
      }
    case 'HIDE_MENU':
      return {
        ...state,
        menuVisible: false,
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
