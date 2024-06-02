import './index.css'

import {FaStar} from 'react-icons/fa'
import {IoBag, IoLocation} from 'react-icons/io5'

const SimilarJobCard = props => {
  const {eachJob} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachJob

  return (
    <li className="similar-job-cont">
      <div className="logo-title-cont">
        <img
          className="company-logo-img"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="title-rating-cont">
          <h1 className="head1">{title}</h1>
          <div className="rating-cont">
            <FaStar className="star" />
            <p className="head2">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="head2">Description</h1>
      <p>{jobDescription}</p>
      <IoLocation />
      <p>{location}</p>
      <IoBag />
      <p>{employmentType}</p>
    </li>
  )
}

export default SimilarJobCard
