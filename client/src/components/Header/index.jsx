import * as React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import routesActions from 'actions/routes'
import security from 'thunks/security'

const mapStateToProps = ({ page, me }) => ({ page, me })
const mapDispatchToProps = (dispatch) => ({
  goToMain: () => dispatch(routesActions.goToMain()),
  goToClasses: () => dispatch(routesActions.goToClasses()),
  logout: () => dispatch(security.logout())
})

class Header extends React.Component {
  render () {
    if (['Login', 'NotFound'].indexOf(this.props.page) > -1) {
      return null
    }

    return (
      <div className='H(50px) Bgc(#ddd) Px(50px) Lh(50px)'>
        <span className='Cur(p) Px(10px)' onClick={this.props.goToMain}>Главная</span>
        <span className='Cur(p) Px(10px)' onClick={this.props.goToClasses}>Классы</span>
        <span className='Cur(p) Px(10px) Fl(end)' onClick={this.props.logout}>Выход</span>
        <span className='Px(10px) Fl(end)'>
          <span className='Bgc(#eee) P(5px)'>{this.props.me.data && this.props.me.data.name}</span>
        </span>
      </div>
    )
  }
}

Header.propTypes = {
  page: PropTypes.string.isRequired,
  me: PropTypes.object.isRequired,
  goToClasses: PropTypes.func.isRequired,
  goToMain: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
