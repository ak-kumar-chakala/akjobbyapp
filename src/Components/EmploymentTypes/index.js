import './index.css'

const EmploymentTypes = props => {
  const {eachType, onChangeEmploymentType} = props

  const {label, employmentTypeId} = eachType

  const onClickEmploymentType = () => onChangeEmploymentType(employmentTypeId)

  return (
    <div className="input-checkbox-cont">
      <input id={employmentTypeId} type="checkbox" />
      <label onClick={onClickEmploymentType} htmlFor={employmentTypeId}>
        {label}
      </label>
    </div>
  )
}

export default EmploymentTypes
