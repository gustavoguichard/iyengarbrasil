import { isEmpty } from 'lodash'

export const initState = {
  activeTab: true,
  currentSection: 'home',
  menuOpen: false,
  menuVisible: true,
  ticks: 0,
  windowH: 0,
  windowW: 0,
  windowY: 0,
}

export default (state = initState, action) => {
  state = isEmpty(state) ? initState : state
  switch(action.name) {
    case 'WINDOW_RESIZED':
      return {
        ...state,
        windowW: action.width || state.windowW,
        windowH: action.height || state.windowH,
      }
    case 'CHANGED_TAB':
      return {
        ...state,
        activeTab: action.active,
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
    case 'CLOSE_MENU':
      return {
        ...state,
        menuOpen: false,
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
