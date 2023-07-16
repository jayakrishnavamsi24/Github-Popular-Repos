import './index.css'

const RepositoryItem = props => {
  const {eachRepo} = props
  const {name, avatarUrl, issuesCount, forksCount, starsCount} = eachRepo
  return (
    <li className="repo-card">
      <img className="avatar-img" src={avatarUrl} alt={name} />
      <p>{name}</p>
      <div className="data-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="data-icon"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="data-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="data-icon"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="data-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="data-icon"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
