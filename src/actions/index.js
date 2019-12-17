/*
* Insert in this folder your redux actions.
* If you do not use redux, you can delete this section.
*/
export function helloWorld () {
  return {
    type: 'hello_world',
    payload: {
      value: 'Hello React!'
    }
  }
}
