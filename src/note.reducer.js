export default function NoteReducer(currentState = { id: null, title: null, body: null, color: null, icon: null, toSearch: '' }, action) {
  switch (action.type) {
    case "SET_NOTE":
      return {
        ...currentState,
        title: action.payload.title,
        body: action.payload.body,
        id: action.payload.id,
        color: action.payload.color,
        icon: action.payload.icon
      }
    case "SEARCH_NOTE":
      return {
        ...currentState,
        toSearch: action.payload.toSearch
      }
    default:
      return currentState
  }
}