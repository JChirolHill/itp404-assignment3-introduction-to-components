import React from 'react';

export default function SubredditPost(props) {
  let post = props.post;
  return (
    <div className="result">
      {post.title}
    </div>
  );
}
