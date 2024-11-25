import React from 'react'

const Register = () => {
  return (
    <div>
      <div className='header-div'>
        <h2>Register</h2>
      </div>
      <div className='form-div'>
        <form>

        <label htmlFor="">Email </label>
        <input type="email" placeholder='Enter email' />
        
        <label htmlFor="">Password </label>
        <input type="password" placeholder='Enter password' />

        <label htmlFor="">Password </label>
        <input type="password" placeholder='Confirm password' />

        <button>Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register
