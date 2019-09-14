export async function getSubRedditPosts(subreddit) {
  let response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
  // let response = await fetch(`https://api.github.com/orgs/emberjs/members`);
  console.log(response);
  let posts = await response.json();
  console.log(posts);
  return posts;
}
