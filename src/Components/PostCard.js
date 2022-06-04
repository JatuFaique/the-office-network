import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleBookmark, handleUnBookmark } from "../features/auth/authSlice";
import {
  handleDislike,
  handleLike,
  userComments,
  userDeleteComments,
} from "../features/timeline/postSlice";

function PostCard({ post }) {
  const { userDetail, token } = useSelector((state) => state.auth);
  const [comment, setComment] = useState({});
  const dispatch = useDispatch();

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
          <div className="av-lg txt-prm br-prm">
            A <span className="badge-act"></span>
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
            {userDetail[0]} <span className="badge-act"></span>
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
              <div className="comment__card border-radius p-0-5">
                <div className="flex">
                  <div className="av-m txt-white bg-scn">
                    {comment.username[0]}
                  </div>
                  <span>
                    <h3>{comment.username}</h3>
                  </span>
                </div>

                <div className="comment__content">
                  <p>{comment.text}</p>
                </div>
                {userDetail.username === comment.username ? (
                  <span onClick={() => handleCommentDelete(comment._id)}>
                    <i class=" btn trash fa-solid fa-trash"></i>
                  </span>
                ) : (
                  <></>
                )}
              </div>
            );
          })}

          {/* <div className="comment__card border-radius p-0-5">
            <div className="flex">
              <div className="av-m txt-white bg-scn">R</div>
              <span>
                <h3>Hello</h3>
              </span>
            </div>

            <div className="comment__content">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Repellendus ut deserunt
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
