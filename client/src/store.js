import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import rootReducer, { middleware, enhancer } from 'reducers'

const store = createStore(rootReducer, composeWithDevTools(enhancer, applyMiddleware(middleware, logger)))

export default store
