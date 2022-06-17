import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleBookmark, handleUnBookmark } from "../features/auth/authSlice";
import {
  deleteUsersPost,
  edituserPosts,
  handleDislike,
  handleLike,
  userComments,
  userDeleteComments,
} from "../features/timeline/postSlice";
import Comments from "./Comments";
import EditPostModal from "./EditPostModal";

function PostCard({ post }) {
  const { userDetail, token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const [comment, setComment] = useState({});
  const [editPostModal, setEditPostModal] = useState(false);
  const dispatch = useDispatch();

  const userInfo =
    users && users?.find((user) => user.username === post.username);
  console.log("hi", userInfo);

  const handleEditPost = (editedPost) => {
    console.log("jj", editedPost);
    dispatch(
      edituserPosts({ token: token, postId: post._id, postContent: editedPost })
    );
    setEditPostModal(false);
  };

  const handleDeletePost = () => {
    dispatch(deleteUsersPost({ token: token, postId: post._id }));
    setEditPostModal(false);
  };

  const handleComment = (event) => {
    setComment({
      ...comment,
      text: event.target.value,
    });
  };

  const handleCommentSubmit = () => {
    dispatch(
      userComments({ token: token, commentContent: comment, postId: post._id })
    );
    setComment({ text: "" });
  };

  const handleCommentDelete = (commentId) => {
    console.log("ybddbb", commentId);
    dispatch(
      userDeleteComments({
        token: token,
        commentId: commentId,
        postId: post._id,
      })
    );
  };

  const isActiveUser = userDetail.username === post.username ? true : false;

  const isLiked = post.likes.likedBy?.some(
    (like) => like._id === userDetail._id
  );

  const isBookmarked = userDetail.bookmarks.some((mark) => mark === post._id);

  const bookmarkHandler = () => {
    isBookmarked
      ? dispatch(handleUnBookmark({ postId: post._id, token: token }))
      : dispatch(handleBookmark({ postId: post._id, token: token }));
    // dispatch(handleBookmark({ postId: post._id, token: token }));
  };

  const likeHandler = () => {
    isLiked
      ? dispatch(handleDislike({ postId: post._id, token: token }))
      : dispatch(handleLike({ postId: post._id, token: token }));
  };

  return (
    <div className="flex px-2 py-1">
      <div className="post border-bs px-2 py-1 post__horizontal">
        <div className="post__header flex">
          {isActiveUser ? (
            <span
              onClick={() => setEditPostModal(true)}
              className="post__actions btn"
            >
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </span>
          ) : (
            <></>
          )}

          <div className="av-lg txt-prm br-prm">
            {userInfo?.profilePic ? (
              <img src={userInfo.profilePic} />
            ) : (
              <>
                <i class="fa-solid fa-user-tie"></i>
              </>
            )}
            <span className="badge-act"></span>
          </div>
          <span>
            <Link to={`/profile/${post.username}`}>
              <h3>{post.username}</h3>
            </Link>
          </span>
        </div>
        <div className="post__text py-1">
          <p>{post.content}</p>
        </div>
        <div className="post__buttons flex py-1">
          <span onClick={likeHandler} className="btn txt-scn">
            {/* <!-- <i className="fa-solid fa-heart"></i> --> */}
            <i
              className={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
            ></i>
            {post.likes.likeCount} Like
          </span>
          <span onClick={bookmarkHandler} className="btn">
            <i
              className={
                isBookmarked ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"
              }
            ></i>
            BookMark
          </span>
        </div>
        <div className="user__comment flex">
          <div className="av-m txt-prm br-prm">
            {userInfo?.profilePic ? (
              <img src={userInfo.profilePic} />
            ) : (
              <>
                <i class="fa-solid fa-user-tie"></i>
              </>
            )}
            <span className="badge-act"></span>
          </div>
          <input
            value={comment.text}
            onChange={handleComment}
            className="border-bs"
            type="text"
          />
          <button
            onClick={handleCommentSubmit}
            className="btn bg-prm py-0-25 px-0-5 txt-white"
          >
            Send
          </button>
        </div>
        <div className="post__comments flex column py-1">
          {post.comments?.map((comment) => {
            return (
              <Comments
                handleCommentDelete={handleCommentDelete}
                comment={comment}
              />
            );
          })}
        </div>
      </div>

      {editPostModal ? (
        <div
          style={{ position: "fixed", left: "230px", top: 0, zIndex: "80000" }}
          className="overlay"
        >
          <EditPostModal
            post={post}
            setEditPostModal={setEditPostModal}
            handleEditPost={handleEditPost}
            handleDeletePost={handleDeletePost}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PostCard;
