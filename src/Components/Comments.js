import React from "react";
import { useSelector } from "react-redux";

function Comments({ comment, handleCommentDelete }) {
  const { userDetail, token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);

  const userInfo =
    users && users?.find((user) => user.username === comment.username);
  console.log("hi", userInfo);
  return (
    <div className="comment__card border-radius p-0-5">
      <div className="flex">
        <div className="av-m txt-white bg-scn">
          {userInfo?.profilePic ? (
            <img src={userInfo.profilePic} />
          ) : (
            <>
              <i class="fa-solid fa-user-tie"></i>
            </>
          )}
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
}

export default Comments;
