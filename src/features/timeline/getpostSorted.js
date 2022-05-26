export const getpostSorted = (showBy, post) => {
  if (showBy === "Recent") {
    const sorted = post
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return sorted;
  } else {
    const sorted = post.slice().sort((a, b) => {
      return b.likes.likeCount - a.likes.likeCount;
    });
    //   .filter((post) => post.likes.likeCount > 0);
    console.log("yele", sorted);
    return sorted;
  }
};
