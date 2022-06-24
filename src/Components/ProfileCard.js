import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ProfileCard({
  isActiveUser,
  currUserDetail,
  usersPost,
  setEditProfileModal,
  followUser,
  unfollowUser,
}) {
  return (
    <div class="profile__card border-radius border-bs bg-prm flex txt-white p-0-5">
      {isActiveUser ? (
        <>
          <button
            onClick={() => setEditProfileModal(true)}
            className="btn px-1 py-1 txt-white bg-scn border-bs border-radius"
          >
            Edit Profile
          </button>
        </>
      ) : (
        <></>
      )}

      <div class="profile__avatar flex">
        <div class="av-lg txt br-scn bg-acc">
          {currUserDetail?.profilePic ? (
            <img src={currUserDetail.profilePic} />
          ) : (
            <>
              <i class="fa-solid fa-user-tie"></i>
            </>
          )}
          <span class="badge-act"></span>
        </div>
        <div class="bold">{`@${currUserDetail.username}`}</div>
      </div>
      <div class="profile__information flex p-0-5">
        <div class="followers p-0-5">
          {currUserDetail.followers?.length}
          <span> followers</span>
        </div>
        <div class="posts p-0-5">
          {usersPost?.length} <span> posts</span>
        </div>
        <div class="following p-0-5">
          {currUserDetail.following?.length} <span> following</span>
        </div>
      </div>
      <div class="about flex">
        <div class="grid">
          <h3>Bio</h3>
          <p>{currUserDetail?.bio}</p>
          <h2>Portfolio</h2>
          <p>{currUserDetail?.portfolio}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
