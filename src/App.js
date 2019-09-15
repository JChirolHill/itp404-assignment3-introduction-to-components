import React from 'react';
import './App.css';
import Loading from './Loading';
import Results from './Results';
import { getSubredditPosts } from './RedditApi';
import { getSubredditBanner } from './RedditApi';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      subreddit: '',
      subscribers: '',
      banner: '',
      loading: true,
    };
  }
  // https://cdn.pixabay.com/photo/2015/03/17/02/01/cubes-677092_640.png

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
          <form id="redditForm">
            <input type="text" name="subreddit" placeholder="Enter a topic..."/>
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
