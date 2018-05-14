import { createAction } from 'redux-actions'
import { NOT_FOUND } from 'redux-first-router'

import routes from 'app-constants/routes'

export default {
  goToForbidden: createAction(routes.FORBIDDEN),
  goToLogin: createAction(routes.ROUTE_LOGIN),
  goToMain: createAction(routes.ROUTE_MAIN),
  goToClasses: createAction(routes.ROUTE_CLASSES),
  goToNotFound: createAction(NOT_FOUND)
}
