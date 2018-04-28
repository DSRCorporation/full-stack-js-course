document.addEventListener('DOMContentLoaded', function(){

  const createStore = (reducer, initialState) => {
    let state = initialState
    let listeners = []

    const getState = () => state
    
    const dispatch = (action) => {
      state = reducer(state, action)
      listeners.forEach(listener => listener())
    }

    const subscribe = (listener) => {
      listeners.push(listener)
      return () => {
        listeners = listeners.filter(l => l !== listener)
      }
    }

    return { getState, dispatch, subscribe }
  }

  // reducer
  const counter = (state, action) => {
    switch (action.type) {
      case 'INCREMENT': 
        return state + 1
      case 'DECREMENT':
        return state - 1
      default:
        return state
    }
  }
  // reducer

  const store = createStore(counter, 0)

  window.increment = () => {
    store.dispatch({type: 'INCREMENT'})
  }

  window.decrement = () => {
    store.dispatch({type: 'DECREMENT'})
  }

  const buttonInc = "<button onclick='increment()'>INCREMENT</button>"
  const buttonDec = "<button onclick='decrement()'>DECREMENT</button>"
  const result = "<div id='result'></div>"

  const render = () => {
    document.getElementById('root').innerHTML = buttonInc + buttonDec + result
    document.getElementById('result').innerHTML = store.getState()
  }

  store.subscribe(render)
  render()
})