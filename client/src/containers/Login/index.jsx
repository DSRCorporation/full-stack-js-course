import * as React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import isEmpty from 'lodash/isEmpty'

import PropTypes from 'prop-types'
import security from 'thunks/security'
import { renderField } from 'utils/common'

const mapDispatchToProps = (dispatch) => ({
  login: (credentials, resolve, reject) => dispatch(security.login(credentials, resolve, reject))
})

class Login extends React.Component {
  submit = (values) => {
    const errors = {}

    if (!values.login) {
      errors.login = 'Обязательное поле'
    }
    if (!values.password) {
      errors.password = 'Обязательное поле'
    }

    if (!isEmpty(errors)) {
      throw new SubmissionError(errors)
    }

    return new Promise((resolve, reject) => {
      this.props.login(values, resolve, reject)
    })
  }

  render () {
    return (
      <div className='H(100%) D(f) Jc(c) Ai(c)'>
        <form className='P(50px) W(200px) Bgc(#ccc) Pos(r)' onSubmit={this.props.handleSubmit(this.submit)}>
          <Field name='login' type='text' component={renderField} label='Логин' />
          <Field name='password' type='text' component={renderField} label='Пароль' />
          {this.props.error && <span className='Pos(a) C(red) B(10px) Ta(c) W(200px)'>{this.props.error}</span>}
          <div className='W(100%) Ta(c)'>
              <button
              type='submit'
              disabled={this.props.submitting}
              className='Mt(10px) P(10px) W(100px) Bgc(#a2cea2) C(#fff) Bgc(grey):disabled'
            >
              Войти
            </button>
            </div>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired
}

export default reduxForm({ form: 'login' })(connect(null, mapDispatchToProps)(Login))
