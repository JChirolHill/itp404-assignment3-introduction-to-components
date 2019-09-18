import React from 'react';
import SubredditPost from './SubredditPost';
import { parseNum } from './HelperFunctions';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id="results">
        {this.props.subreddit != '' &&
          <div id="topData">
            Showing results for "{this.props.subreddit}"<br/>
            {parseNum(this.props.subscribers)} Subscribers
          </div>
        }

        {this.props.subreddit != '' && this.props.posts.map((post) => {
          return <SubredditPost onRead={this.props.onRead} post={post.data} key={post.data.id}/>
        })}
      </div>
    );
  }
}
