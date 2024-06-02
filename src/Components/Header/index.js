import {Link, withRouter} from 'react-router-dom'

import './index.css'

import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
      </Link>

      <ul className="home-jobs-button-container">
        <Link to="/">
          <li className="home-button">Home</li>
        </Link>
        <Link to="/jobs">
          <li className="home-button">Jobs</li>
        </Link>
      </ul>
      <li className="btn-li">
        <button onClick={onClickLogout} className="logout-button" type="button">
          Logout
        </button>
      </li>
    </nav>
  )
}

export default withRouter(Header)
