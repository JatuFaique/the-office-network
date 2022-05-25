import React from "react";
import { useSelector } from "react-redux";

function PostCard({ post }) {
  const { userDetail } = useSelector((state) => state.auth);
  return (
    <div className="flex px-2 py-1">
      <div class="post border-bs px-2 py-1 post__horizontal">
        <div class="post__header flex">
          <div class="av-lg txt-prm br-prm">
            A <span class="badge-act"></span>
          </div>
          <span>
            <h3>{post.username}</h3>
          </span>
        </div>
        <div class="post__text py-1">
          <p>{post.content}</p>
        </div>
        <div class="post__buttons flex py-1">
          <span class="txt-scn">
            {/* <!-- <i class="fa-solid fa-heart"></i> --> */}
            <i class="fa-regular fa-heart"></i>
            {post.likes.likeCount} Like
          </span>
          <span>
            <i class="fa-regular fa-bookmark"></i>
            BookMark
          </span>
        </div>
        <div class="user__comment flex">
          <div class="av-m txt-prm br-prm">
            {userDetail[0]} <span class="badge-act"></span>
          </div>
          <input class="border-bs" type="text" />
          <button class="btn bg-prm py-0-25 px-0-5 txt-white">Send</button>
        </div>
        <div class="post__comments flex column py-1">
          {post.comments?.map((comment) => {
            return (
              <div class="comment__card border-radius p-0-5">
                <div class="flex">
                  <div class="av-m txt-white bg-scn">{comment.username[0]}</div>
                  <span>
                    <h3>{comment.username}</h3>
                  </span>
                </div>

                <div class="comment__content">
                  <p>{comment.text}</p>
                </div>
              </div>
            );
          })}

          {/* <div class="comment__card border-radius p-0-5">
            <div class="flex">
              <div class="av-m txt-white bg-scn">R</div>
              <span>
                <h3>Hello</h3>
              </span>
            </div>

            <div class="comment__content">
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
