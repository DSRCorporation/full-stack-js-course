import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer, { middleware, enhancer } from 'reducers'

const store = createStore(rootReducer, composeWithDevTools(enhancer, applyMiddleware(thunk, middleware, logger)))

export default store
