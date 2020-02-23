import React, { useState } from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'

const LoginForm = ({ changeUser, showError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      changeUser(user)
    } catch (error) {
      showError('wrong username or password')
    }
  }

  return (
    <div>
      <form onSubmit={login}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  changeUser: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired
}

export default LoginForm
