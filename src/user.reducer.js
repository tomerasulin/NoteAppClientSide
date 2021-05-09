export default function userReducer(currentState = { token: null }, action){
  switch(action.type){
    case "SET_TOKEN":
      return{
        ...currentState,
        token: action.payload
      }
    default:
      return currentState
  }
}