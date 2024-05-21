import {Link, withRouter} from 'react-router-dom'
import './index.css'
import {FaStar} from 'react-icons/fa'
import {IoBag, IoLocation} from 'react-icons/io5'

const JobCardItem = props => {
  const {eachCard} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
    rating,
    title,
    id,
  } = eachCard

  return (
    <Link className="link-style" to={`/jobs/${id}`}>
      <li className="job-card-item-container">
        <div className="logo-tile-rating-div">
          <img className="logo-image" alt="company logo" src={companyLogoUrl} />
          <div>
            <h1 className="title">{title}</h1>
            <div className="rating-cont">
              <FaStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>

        <div className="location-package-cont">
          <div className="location-employment">
            <IoLocation className="location-image" />
            <p className="location">{location}</p>
            <IoBag />
            <p className="employment-type">{employmentType}</p>
          </div>
          <div>
            <h1 className="package-per-annum">{packagePerAnnum}</h1>
          </div>
        </div>

        <hr />
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default withRouter(JobCardItem)
