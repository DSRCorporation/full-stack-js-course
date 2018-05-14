import * as React from 'react'

class Login extends React.Component {
  render () {
    return (
      <div className='H(100%) D(f) Jc(c) Ai(c)'>
        <div className='P(50px) W(200px) Bgc(#ccc)'>
          <div>Логин</div>
          <input className='W(100%) H(30px) My(10px)' />
          <div className='C(red)'>Обязательное поле</div>
          <div className='Mt(20px)'>Пароль</div>
          <input className='W(100%) H(30px) Mt(10px)' />
          <div className='W(100%) Ta(c)'>
            <button className='Mt(20px) P(10px) W(100px) Bgc(#a2cea2) C(#fff)'>Войти</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
