import * as React from 'react'

export const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div className='Mt(10px) Mb(30px) Pos(r)'>
      <input {...input} className='W(100%) H(30px)' type={type} />
      {touched && error && <span className='C(red) Pos(a) Mt(5px)'>{error}</span>}
    </div>
  </div>
)
