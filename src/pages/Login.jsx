import React from 'react'

const Login = () => {
  return (
    <div>
      <div className='header-div'>
        <h2>Login</h2>
      </div>
      <div className='form-div'>
        <form>
            <label htmlFor="">Email </label>
            <input type="email" placeholder='Enter email' />

            <label htmlFor="">Password </label>
            <input type="password" placeholder='Enter password' />

            <button>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
