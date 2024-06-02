import './index.css'

const SalaryRange = props => {
  const {eachRange, onChangeSalaryRange} = props

  const {salaryRangeId, label} = eachRange

  const onClickSalaryButton = () => {
    onChangeSalaryRange(salaryRangeId)
  }

  return (
    <li className="radio-element">
      <label>
        <input
          id={salaryRangeId}
          type="radio"
          name="salary"
          value={salaryRangeId}
          onClick={onClickSalaryButton}
        />
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
