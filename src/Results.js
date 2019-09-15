import React from 'react';
import SubredditPost from './SubredditPost';
import { parseNum } from './HelperFunctions';

export default function Results(props) {
  return(
    <div id="results">
      <div id="topData">
        Showing results for "{props.subreddit}"<br/>
        {parseNum(props.subscribers)} Subscribers
      </div>
      {props.posts.map((post) => {
        return <SubredditPost post={post.data} key={post.data.id}/>
      })}
    </div>
  );
}
