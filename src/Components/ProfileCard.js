import React from "react";

function ProfileCard({
  isActiveUser,
  userDetail,
  usersPost,
  setEditProfileModal,
}) {
  console.log("pappa", userDetail);
  return (
    <div class="profile__card border-radius border-bs bg-prm flex txt-white p-0-5">
      {isActiveUser ? (
        <button
          onClick={() => setEditProfileModal(true)}
          className="btn px-1 py-1 bg-scn"
        >
          Edit Profile
        </button>
      ) : (
        <></>
      )}

      <div class="profile__avatar flex">
        <div class="av-lg txt br-scn bg-acc">
          A<span class="badge-act"></span>
        </div>
        <div class="bold">{`@${userDetail.username}`}</div>
      </div>
      <div class="profile__information flex p-0-5">
        <div class="followers p-0-5">
          {userDetail.followers?.length}
          <span>followers</span>
        </div>
        <div class="posts p-0-5">
          {usersPost?.length} <span>posts</span>
        </div>
        <div class="following p-0-5">
          {userDetail.following?.length} <span>following</span>
        </div>
      </div>
      <div class="about flex">
        <div class="grid">
          <h3>Bio</h3>
          <p>{userDetail?.bio}</p>
          <h2>Portfolio</h2>
          <p>{userDetail?.portfolio}</p>
        </div>
        <div>
          <button class="btn px-1 py-1 border-bs border-radius bg-scn txt-white">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
