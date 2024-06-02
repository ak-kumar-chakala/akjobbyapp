import {Component} from 'react'
import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'
import './index.css'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobCardItem from '../JobCardItem'
import EmploymentTypes from '../EmploymentTypes'
import SalaryRange from '../SalaryRange'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileStatus: '',
    profileData: '',
    selectedSalary: '',
    isFullTimeClicked: '',
    isPartTimeClicked: '',
    isFreelanceClicked: '',
    isInternshipClicked: '',
    jobsData: [],
    jobCardStatus: '',
    searchInput: '',
    loadingStatus: true,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobCardDetails()
  }

  getJobCardDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const {
      isFullTimeClicked,
      isPartTimeClicked,
      isFreelanceClicked,
      isInternshipClicked,
      selectedSalary,
      searchInput,
    } = this.state

    const sampleFilterArray = [
      isFullTimeClicked,
      isPartTimeClicked,
      isFreelanceClicked,
      isInternshipClicked,
    ]

    const updatedArray = sampleFilterArray.filter(
      eachFilter => eachFilter !== '',
    )

    console.log(updatedArray)

    const joinedArray = updatedArray.join(',')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${joinedArray}&minimum_package=${selectedSalary}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    this.setState({
      loadingStatus: false,
    })
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const jobsCardData = fetchedData.jobs
      const updatedData = jobsCardData.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        packagePerAnnum: eachItem.package_per_annum,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
        id: eachItem.id,
      }))

      this.setState({
        jobsData: updatedData,
        jobCardStatus: 'SUCCESS',
      })
    }

    if (response.status === 401) {
      this.setState({
        jobCardStatus: 'FAILURE',
      })
    }
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const profileDetails = fetchedData.profile_details

      const updatedData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileStatus: 'SUCCESS',
        profileData: updatedData,
      })
    }

    if (response.status === 401) {
      this.setState({
        profileStatus: 'FAILURE',
      })
    }
  }

  renderProfileView = () => {
    const {profileStatus, profileData} = this.state

    const {name, profileImageUrl, shortBio} = profileData

    if (profileStatus === 'SUCCESS') {
      return (
        <div className="profile-container">
          <img className="bio-image" alt="profile" src={profileImageUrl} />
          <h1 className="profile-head">{name}</h1>
          <p className="profile-bio">{shortBio}</p>
        </div>
      )
    }

    if (profileStatus === 'FAILURE') {
      return (
        <div>
          <button type="button">Retry</button>
        </div>
      )
    }

    return null
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onSubmitForm = event => {
    event.preventDefault()
    this.getJobCardDetails()
  }

  renderJobCardData = () => {
    const {jobsData, jobCardStatus} = this.state

    if (jobCardStatus === 'SUCCESS') {
      if (jobsData.length === 0) {
        return (
          <div className="no-jobs-cont">
            <img
              alt="no jobs"
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            />
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs.Try other filters.</p>
          </div>
        )
      }
      return (
        <li className="job-card-container">
          {jobsData.map(eachItem => (
            <JobCardItem key={eachItem.id} eachCard={eachItem} />
          ))}
        </li>
      )
    }
    if (jobCardStatus === 'FAILURE') {
      return (
        <div>
          <img
            alt="failure view"
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>we cannot seem to find the page you are looking for.</p>
          <button type="button">Retry</button>
        </div>
      )
    }

    return null
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onChangeEmploymentType = employmentTypeId => {
    const {
      isFullTimeClicked,
      isInternshipClicked,
      isPartTimeClicked,
      isFreelanceClicked,
    } = this.state

    if (employmentTypeId === 'FULLTIME') {
      if (isFullTimeClicked === '') {
        this.setState({isFullTimeClicked: 'FULLTIME'}, this.getJobCardDetails)
      } else {
        this.setState({isFullTimeClicked: ''}, this.getJobCardDetails)
      }
    }

    if (employmentTypeId === 'PARTTIME') {
      if (isPartTimeClicked === '') {
        this.setState({isPartTimeClicked: 'PARTTIME'}, this.getJobCardDetails)
      } else {
        this.setState({isPartTimeClicked: ''}, this.getJobCardDetails)
      }
    }

    if (employmentTypeId === 'FREELANCE') {
      if (isFreelanceClicked === '') {
        this.setState({isFreelanceClicked: 'FREELANCE'}, this.getJobCardDetails)
      } else {
        this.setState({isFreelanceClicked: ''}, this.getJobCardDetails)
      }
    }

    if (employmentTypeId === 'INTERNSHIP') {
      if (isInternshipClicked === '') {
        this.setState(
          {isInternshipClicked: 'INTERNSHIP'},
          this.getJobCardDetails,
        )
      } else {
        this.setState({isInternshipClicked: ''}, this.getJobCardDetails)
      }
    }
  }

  onChangeSalaryRange = id => {
    this.setState({selectedSalary: id}, this.getJobCardDetails)
  }

  render() {
    const {loadingStatus} = this.state

    return (
      <div className="jobs-home-container">
        <Header />
        <div className="job-description-filters-container">
          <div className="profile-filters-container">
            {this.renderProfileView()}
            <hr />
            <div className="filters-container">
              <h1 className="type-employ-head">Type of Employment</h1>
              <ul>
                {employmentTypesList.map(eachItem => (
                  <EmploymentTypes
                    eachType={eachItem}
                    key={eachItem.employmentTypeId}
                    onChangeEmploymentType={this.onChangeEmploymentType}
                  />
                ))}
              </ul>
            </div>
            <div className="radio-elements">
              <h1 className="type-employ-head">Salary Range</h1>
              <ul>
                {salaryRangesList.map(eachItem => (
                  <SalaryRange
                    eachRange={eachItem}
                    key={eachItem.salaryRangeId}
                    onChangeSalaryRange={this.onChangeSalaryRange}
                  />
                ))}
              </ul>
            </div>
          </div>

          <div className="job-description-container">
            <form onSubmit={this.onSubmitForm} className="search-input-div">
              <input
                placeholder="Search"
                className="search-input"
                type="search"
                onChange={this.onChangeSearchInput}
              />

              <button
                className="search-button"
                data-testid="searchButton"
                type="submit"
                aria-label="Search"
              >
                <BsSearch className="search-icon" />
              </button>
            </form>

            <div className="job-cards-container">
              {loadingStatus && this.renderLoadingView()}
              <ul>{this.renderJobCardData()}</ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
