export const getFollowingUser = ({ post, following, uid }) => {
  if (post) {
    const usernames = following.map(({ username }) => username);
    post.map((post) => console.log(post.username, usernames));
    return post.filter(
      ({ username }) => usernames.includes(username) || username === uid
    );
  }
};
