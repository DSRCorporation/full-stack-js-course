import * as React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps = ({ classes }) => ({ classes })

class Classes extends React.Component {
  onRowClick (id) {
    console.log(id)
  }

  renderRows (classes) {
    if (!classes) {
      return null
    }

    const rows = classes.entities.map((item) => (
      <div key={item.id} onClick={() => this.onRowClick(item.id)} className='Cur(p) Bgc(white) P(10px) Bd Bdc(black) My(5px)'>{item.name}</div>
    ))

    return rows
  }

  render () {
    return (
      <div className='H(100%) Bgc(#eee) P(50px)'>{this.renderRows(this.props.classes.data)}</div>
    )
  }
}

Classes.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Classes)
