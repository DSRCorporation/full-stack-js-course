import { combineReducers } from 'redux'
import { connectRoutes } from 'redux-first-router'

import createHistory from 'history/createBrowserHistory'
import classesReducer from 'reducers/classes'
import page from 'reducers/page'
import routesMap from 'routesMap'

const history = createHistory()

export const { reducer, middleware, enhancer } = connectRoutes(history, routesMap)

const rootReducer = combineReducers({
  classesReducer,
  location: reducer,
  page
})

export default rootReducer
