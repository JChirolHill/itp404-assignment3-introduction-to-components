import React from 'react';
import './App.css';
import Loading from './Loading';
import Results from './Results';
import PreviousSearches from './PreviousSearches';
import NoResults from './NoResults';
import { getSubredditPosts } from './RedditApi';
import { getSubredditBanner } from './RedditApi';

class App extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      posts: [],
      subreddit: '',
      subscribers: '',
      banner: '',
      loading: false,
      userInput: '',
      readCount: 0,
      previousSearches: [],
      showPrevious: false,
      noResults: false,
    };
  }

  handleChange(event) {
    this.setState({ userInput: event.target.value })
  }

  async handleSubmit(event) {
    event.preventDefault();
    let tempPrevSearches = this.state.previousSearches;
    tempPrevSearches.push(this.state.userInput);
    this.setState({
      loading: true,
      previousSearches: tempPrevSearches,
    });

    let [posts, banner] = await Promise.all([
      getSubredditPosts(this.state.userInput),
      getSubredditBanner(this.state.userInput)
    ]);

    this.setState({
      posts,
      subreddit: posts[0] ? posts[0].data.subreddit : '',
      subscribers: posts[0] ? posts[0].data.subreddit_subscribers : '',
      banner,
      loading: false,
      userInput: '',
      noResults: posts[0] ? false : true,
    });
    console.log('noresults: ' + this.state.noResults);
  }

  handleReadCount = () => {
    this.setState({ readCount: this.state.readCount + 1 });
  }

  handleSearchPrevious = async (term) => {
    this.setState({
      loading: true,
    });

    let [posts, banner] = await Promise.all([
      getSubredditPosts(term),
      getSubredditBanner(term)
    ]);

    this.setState({
      posts,
      subreddit: posts[0] ? posts[0].data.subreddit : '',
      subscribers: posts[0] ? posts[0].data.subreddit_subscribers : '',
      banner,
      loading: false,
      userInput: '',
      noResults: posts[0] ? false : true,
    });
  }

  handleShowPrevious = () => {
    this.setState({ showPrevious: !this.state.showPrevious })
  }

  render() {
    let backgroundBanner = {
      backgroundImage: `url(${this.state.banner})`
    };

    return (
      <div className="App">
        <div className="readCount">{this.state.readCount}</div>
        <div className="previousSearches">
          { this.state.showPrevious ? <PreviousSearches onShowPrevious={this.handleShowPrevious} onLoadPrevious={this.handleSearchPrevious} previousSearches={this.state.previousSearches}/>
             : <i className="fas fa-bars" onClick={this.handleShowPrevious}></i> }
        </div>

        <div className="header" style={this.state.banner ? backgroundBanner : null} >
          <div className="title">
            <i className="fab fa-reddit-alien"></i>
            Reddit Finder
          </div>
          <form id="redditForm" onSubmit={this.handleSubmit}>
            <input type="text" name="subreddit" placeholder="Enter a topic..." onChange={this.handleChange} value={this.state.userInput}/>
            <button type="submit">Go!</button>
          </form>
        </div>

        <div id="results">
          {this.state.loading ? <Loading/> : <Results onRead={this.handleReadCount} posts={this.state.posts} subreddit={this.state.subreddit} subscribers={this.state.subscribers} />}
        </div>
        { this.state.noResults && <NoResults />}
      </div>
    );
  }
}

export default App;
