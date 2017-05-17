import { isEmpty, map } from 'lodash'

export const initState = {
  accordeons: [],
  activeTab: false,
  currentSection: 'home',
  menuOpen: false,
  menuVisible: true,
  openForms: false,
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
    case 'SUBSCRIBE_ACCORDEON':
      return {
        ...state,
        accordeons: [ ...state.accordeons, { id: action.id, index: 0 } ]
      }
    case 'UPDATE_ACCORDEON':
      return {
        ...state,
        accordeons: map(state.accordeons, (acc) => acc.id === action.id
          ? { ...acc, index: action.index }
          : acc
        ),
      }
    case 'SHOW_FORMS':
      return {
        ...state,
        openForms: true,
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
