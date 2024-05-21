import './index.css'

const SalaryRange = props => {
  const {eachRange, onChangeSalaryRange} = props

  const {salaryRangeId, label} = eachRange

  const onClickSalaryButton = () => {
    onChangeSalaryRange(salaryRangeId)
  }

  return (
    <div className="radio-element">
      <input
        id={salaryRangeId}
        type="radio"
        name="salary"
        value={salaryRangeId}
        onClick={onClickSalaryButton}
      />
      <label htmlFor="1">{label}</label>
    </div>
  )
}

export default SalaryRange
