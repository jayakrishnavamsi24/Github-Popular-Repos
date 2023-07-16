import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'

import './index.css'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    isLoading: false,
    isFailed: false,
    activeTabId: languageFiltersData[0].id,
    reposList: [],
  }

  componentDidMount() {
    this.setReposList()
  }

  onTabClick = id => {
    this.setState(
      {
        isLoading: true,
        isFailed: false,
        activeTabId: id,
        reposList: [],
      },
      () => {
        this.setReposList()
      },
    )
  }

  setReposList = async () => {
    const {activeTabId} = this.state
    this.setState({isLoading: true})
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(githubReposApiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))
      console.log(updatedData)
      this.setState({isLoading: false, isFailed: false, reposList: updatedData})
    } else {
      this.setState({isLoading: false, isFailed: true, reposList: []})
    }
  }

  getReposList = () => {
    const {isFailed, reposList} = this.state
    if (isFailed) {
      return (
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
        />
      )
    }
    return reposList.map(eachRepo => (
      <RepositoryItem eachRepo={eachRepo} key={eachRepo.id} />
    ))
  }

  getLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading, activeTabId} = this.state

    return (
      <div className="bg-container">
        <h1 className="title">Popular</h1>
        <div className="tabs-container">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              eachLanguage={eachLanguage}
              activeTabId={activeTabId}
              key={eachLanguage.id}
              onTabClick={this.onTabClick}
            />
          ))}
        </div>
        <ul className="content-container">
          {isLoading ? this.getLoader() : this.getReposList()}
        </ul>
      </div>
    )
  }
}

export default GithubPopularRepos
