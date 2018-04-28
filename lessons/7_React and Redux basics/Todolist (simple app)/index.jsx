import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import PropTypes from 'prop-types'

// logger middleware
const logger = store => next => action => {
  console.log(`type: ${action.type}, payload: ${action.payload}`)
  next(action)
}
// logger middleware

class IdCounter {
  constructor() {
    this.id = 0
  }

  getId() {
    return ++this.id
  }
}

const idCounter = new IdCounter()

// store
const initialState = [
  {
    text: 'Get bread',
    id: idCounter.getId()
  },
  {
    text: 'Call Mom',
    id: idCounter.getId()
  },
  {
    text: 'Pay bills',
    id: idCounter.getId()
  }
]

const todosReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.payload,
          id: idCounter.getId()
        }
      ]
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.payload)
    default:
      return state
  }
}

const store = createStore(todosReducer, initialState, applyMiddleware(logger))
// store

// TodoList component

class Todolist extends React.Component {
  addTodo = () => {
    let todo = this.refs.task.value
    if (todo !== '') {
      this.props.addTodo(this.refs.task.value)
      this.refs.task.value = ''
    }
  }
 
  render () {
    return (
      <div>
        {this.props.todos.map((el) => <p key={el.id}>{el.text}<button onClick={() => this.props.removeTodo(el.id)}>Remove</button></p>)}
        <input ref='task'/><button onClick={this.addTodo}>Add</button>
      </div>
    )
  }
}

Todolist.propTypes = {
  todos: PropTypes.array.isRequired,
  addTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({todos: state})
const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (text) => dispatch({type: 'ADD_TODO', payload: text}),
    removeTodo: (id) => dispatch({type: 'REMOVE_TODO', payload: id})
  }
}

const TodolistWrapper = connect(mapStateToProps, mapDispatchToProps)(Todolist)

// TodoList component

// main container

class App extends React.Component {
  render () {
    return (
      <div>
        <h1>Todolist</h1>
        <TodolistWrapper/>
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// main container