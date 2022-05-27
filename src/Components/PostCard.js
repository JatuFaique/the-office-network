import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleDislike, handleLike } from "../features/timeline/postSlice";

function PostCard({ post }) {
  const { userDetail, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isLiked = post.likes.likedBy?.some(
    (like) => like._id === userDetail._id
  );

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
            <h3>{post.username}</h3>
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
          <span>
            <i className="fa-regular fa-bookmark"></i>
            BookMark
          </span>
        </div>
        <div className="user__comment flex">
          <div className="av-m txt-prm br-prm">
            {userDetail[0]} <span className="badge-act"></span>
          </div>
          <input className="border-bs" type="text" />
          <button className="btn bg-prm py-0-25 px-0-5 txt-white">Send</button>
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
