import React from 'react';
import { trimTitle } from './HelperFunctions';
import { getUrl } from './HelperFunctions';
import { getImage } from './HelperFunctions';
import { parseNum } from './HelperFunctions';
import { hasImage } from './HelperFunctions';

export default class SubredditPost extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let post = this.props.post;
    return (
      <div className="result" onClick={this.props.onRead}>
        { hasImage(post.url) ? <img src={getImage(post.url)} alt={'Image for ' + trimTitle(post.title)}/> : ''}
        <div className="resultContent">
          <div className="resultTitle">
            <a href={getUrl(post.permalink)} target="_blank" rel="noopener noreferrer">{trimTitle(post.title)}</a>
          </div>
          <div className="author">By: {post.author}</div>
        </div>
        <div className="topContent">
          { post.num_comments ?
            <div className="resultNumComments">Comments: {parseNum(post.num_comments)}</div>
            : <i>No Comments</i> }
          <div className="resultScore">Score: {post.ups}</div>
        </div>
        { hasImage(post.url) ? <div className="resultOverlay"></div> : <div className="fullOverlay"></div> }
      </div>
    );
  }
}
