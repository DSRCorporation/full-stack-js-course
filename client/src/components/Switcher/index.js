import * as React from 'react'
import { connect } from 'react-redux'
import universal from 'react-universal-component'

const UniversalComponent = universal(({ page }) => import(`containers/${page}`))

const Switcher = ({ page }) => <UniversalComponent page={page} />

const mapStateToProps = ({ page }) => ({ page })

export default connect(mapStateToProps)(Switcher)
