import * as React from 'react'

import Header from 'components/Header'
import Switcher from 'components/Switcher'

class Root extends React.Component {
  render () {
    return (
      <div className='W(1200px) M(a) D(f) Fld(c) H(100%)'>
        <Header />
        <Switcher />
      </div>
    )
  }
}

export default Root
