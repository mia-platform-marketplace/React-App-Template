const initialState = {
  helloReact: 'Initial React'
}

export default function helloWorld (state = initialState, {type, payload}) {
  switch (type) {
    case 'hello_world':
      return {
        ...state,
        helloReact: payload.value
      }
    default:
      return state
  }
}
