import './index.css'

const Skills = props => {
  const {eachSkill} = props

  const skillData = {
    imageUrl: eachSkill.image_url,
    name: eachSkill.name,
  }

  return (
    <div className="skill">
      <img alt="skillImage" src={skillData.imageUrl} />
      <p className="skill-name">{skillData.name}</p>
    </div>
  )
}

export default Skills
