import React from 'react';
import './App.css';
import Loading from './Loading';
import SubredditPost from './SubredditPost';
import { getSubRedditPosts } from './RedditApi';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      loading: true,
    };
  }

  async componentDidMount() {
    let posts = await getSubRedditPosts('cubers');
    this.setState({ posts, loading: false });
  }

  render() {
    return (
      <div className="App">
        <div className="header">
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
          {this.state.loading ? <Loading/> : this.state.posts.map((post) => {
            return <SubredditPost post={post} key={post.id}/>
          })}
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
