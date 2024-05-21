import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaExternalLinkAlt, FaStar} from 'react-icons/fa'
import {IoBag, IoLocation} from 'react-icons/io5'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import Skills from '../Skills'
import SimilarJobCard from '../SimilarJobCard'

class JobCardDetails extends Component {
  state = {
    selectedJobDataDetails: '',
    skills: [],
    lifeAtCompanyDetails: '',
    similarJobs: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getJobCardFullDetails()
  }

  getJobCardFullDetails = async () => {
    this.setState({
      isLoading: false,
    })
    const {match} = this.props

    const {id} = match.params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    const data = await response.json()

    console.log(data)

    const selectedJobData = {
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      id: data.job_details.id,
      jobDescription: data.job_details.job_description,
      lifeAtCompany: data.job_details.life_at_company,
      location: data.job_details.location,
      packagePerAnnum: data.job_details.package_per_annum,
      rating: data.job_details.rating,
      skills: data.job_details.skills,
      title: data.job_details.title,
    }

    const lifeAtCompanyData = {
      description: selectedJobData.lifeAtCompany.description,
      imageUrl: selectedJobData.lifeAtCompany.image_url,
    }

    const similarJobsData = data.similar_jobs.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      rating: eachItem.rating,
      title: eachItem.title,
    }))

    this.setState({
      selectedJobDataDetails: selectedJobData,
      skills: selectedJobData.skills,
      lifeAtCompanyDetails: lifeAtCompanyData,
      similarJobs: similarJobsData,
    })
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSkills = () => {
    const {skills} = this.state

    return (
      <div className="skills-cont">
        {skills.map(eachItem => (
          <Skills eachSkill={eachItem} id={eachItem.name} key={eachItem.name} />
        ))}
      </div>
    )
  }

  renderSelectedProduct = () => {
    const {selectedJobDataDetails} = this.state

    const {lifeAtCompanyDetails} = this.state

    const {description, imageUrl} = lifeAtCompanyDetails

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,

      location,
      packagePerAnnum,
      rating,

      title,
    } = selectedJobDataDetails

    return (
      <div className="selected-job-cont">
        <div className="company-details">
          <img className="companyLogo" alt="companyLogo" src={companyLogoUrl} />
          <div className="title-cont">
            <p className="title">{title}</p>
            <div className="star-cont">
              <FaStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-package-cont">
          <div className="location-employment-cont">
            <div className="location-cont">
              <IoLocation className="location" />
              <p>{location}</p>
            </div>
            <div className="employment-type-cont">
              <IoBag className="io-bag" />
              <p>{employmentType}</p>
            </div>
          </div>
          <p className="title">{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="description-anchor-cont">
          <h1 className="title-description">Description</h1>
          <a className="anchor-element" href={companyWebsiteUrl}>
            Visit
            <FaExternalLinkAlt className="link-symbol" />
          </a>
        </div>
        <p className="description-para">{jobDescription}</p>
        <h1 className="title-description">Skills</h1>
        {this.renderSkills()}
        <h1 className="title">Life at Company</h1>
        <div className="description-image-cont">
          <p className="description-para">{description}</p>
          <img src={imageUrl} alt="skillImage" />
        </div>
      </div>
    )
  }

  render() {
    const {similarJobs, isLoading} = this.state
    return (
      <div className="job-card-details-cont">
        <Header />
        {isLoading && this.renderLoadingView()}
        {this.renderSelectedProduct()}
        <h1 className="title-similar-jobs">Similar Jobs</h1>
        <div className="similar-jobs">
          {similarJobs.map(eachItem => (
            <SimilarJobCard eachJob={eachItem} key={eachItem.id} />
          ))}
        </div>
      </div>
    )
  }
}

export default JobCardDetails
