import React from 'react';
import './App.css';
import Loading from './Loading';
import Results from './Results';
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
      loading: true,
      userInput: '',
    };
  }

  async componentDidMount() {
    let [posts, banner] = await Promise.all([
      getSubredditPosts('cubers'),
      getSubredditBanner('cubers')
    ]);
    this.setState({
      posts,
      subreddit: posts[0].data.subreddit,
      subscribers: posts[0].data.subreddit_subscribers,
      banner,
      loading: false });
  }

  handleChange(event) {
    // console.log(event);
    // this.setState({ userInput: event.target.value })
  }

  handleSubmit(event) {
    // console.log(event);
    // alert('form submitted: ' + this.state.userInput);
    event.preventDefault();
  }

  render() {
    let backgroundBanner = {
      backgroundImage: `url(${this.state.banner})`
    };

    return (
      <div className="App">
        <div className="header" style={this.state.banner ? backgroundBanner : null} >
          <div className="title">
            <i className="fab fa-reddit-alien"></i>
            Reddit Finder
          </div>
          <form id="redditForm" onSubmit={this.handleSubmit}>
            <input type="text" name="subreddit" placeholder="Enter a topic..." onChange={this.handleChange}/>
            <button type="submit">Go!</button>
          </form>
        </div>

        <div id="results">
          {this.state.loading ? <Loading/> : <Results posts={this.state.posts} subreddit={this.state.subreddit} subscribers={this.state.subscribers} />}
        </div>
        <div id="error">
          <i className="fas fa-sad-cry"></i><br/>
          Darn, there are no results for your search...<br/>
          Try again!
        </div>
      </div>
    );
  }
}

export default App;
