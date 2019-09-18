export async function getSubredditPosts(subreddit) {
  let response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
  let posts = await response.json();
  posts = posts.data ? posts.data.children : '';
  return posts;
}

export async function getSubredditBanner(subreddit) {
  let response = await fetch(`https://www.reddit.com/r/${subreddit}/about.json`);
  let banner = await response.json();
  banner = banner.data ? banner.data.banner_background_image : '';
  return banner;
}
