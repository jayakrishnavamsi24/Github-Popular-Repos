import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguage, activeTabId, onTabClick} = props
  const {language, id} = eachLanguage
  const tabStyle = activeTabId === id ? 'selectedTab' : null
  const onTabBtnClick = () => {
    onTabClick(id)
  }
  return (
    <button
      onClick={onTabBtnClick}
      className={`filterBtn ${tabStyle}`}
      type="button"
    >
      {language}
    </button>
  )
}

export default LanguageFilterItem
