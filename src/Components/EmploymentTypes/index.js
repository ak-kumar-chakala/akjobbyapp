import './index.css'

const EmploymentTypes = props => {
  const {eachType, onChangeEmploymentType} = props

  const {label, employmentTypeId} = eachType

  const onClickEmploymentType = () => onChangeEmploymentType(employmentTypeId)

  return (
    <li className="input-checkbox-cont">
      <input id={employmentTypeId} type="checkbox" />
      <label onClick={onClickEmploymentType} htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default EmploymentTypes
