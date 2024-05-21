import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showSubmitError: false,
  }

  onChangeUserName = event => {
    const {username} = this.state
    this.setState({
      username: event.target.value,
    })
    console.log(username)
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log('failure')
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    console.log(username, password)
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg, password, username} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-home-container">
        <form onSubmit={this.submitForm} className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="website-logo"
          />

          <label className="label-element" htmlFor="username-input">
            UserName
          </label>
          <input
            value={username}
            onChange={this.onChangeUserName}
            placeholder="UserName"
            className="input-element"
            id="username-input"
            type="text"
          />
          <label className="label-element" htmlFor="password-input">
            Password
          </label>
          <input
            value={password}
            onChange={this.onChangePassword}
            placeholder="password"
            className="input-element"
            id="password-input"
            type="password"
          />
          <button className="login-button" type="submit">
            Login
          </button>
          {showSubmitError && <p>{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
