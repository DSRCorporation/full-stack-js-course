import * as React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import routesActions from 'actions/routes'

const mapStateToProps = ({ page }) => ({ page })
const mapDispatchToProps = (dispatch) => ({
  goToMain: () => dispatch(routesActions.goToMain()),
  goToClasses: () => dispatch(routesActions.goToClasses())
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
        <span className='Cur(p) Px(10px) Fl(end)'>Выход</span>
        <span className='Px(10px) Fl(end)'>
          <span className='Bgc(#eee) P(5px)'>Мария Ивановна</span>
        </span>
      </div>
    )
  }
}

Header.propTypes = {
  page: PropTypes.string.isRequired,
  goToClasses: PropTypes.func.isRequired,
  goToMain: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
