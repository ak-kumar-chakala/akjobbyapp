import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

import Header from '../Header'

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Header />
        <div className="home-description-container">
          <div>
            <h1 className="home-h1">Find The Job That Fits Your Life</h1>
            <p className="home-p1">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your ability and
              potential.
            </p>
            <Link to="/jobs">
              <button className="find-jobs-btn" type="button">
                Find Jobs
              </button>
            </Link>
          </div>
          <img
            className="home-job-img"
            alt="find jobs"
            src="https://assets.ccbp.in/frontend/react-js/home-lg-bg.png"
          />
        </div>
      </div>
    )
  }
}

export default Home
