import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditProfileModal from "../Components/EditProfileModal";
import PostCard from "../Components/PostCard";
import ProfileCard from "../Components/ProfileCard";
import RightBar from "../Components/RightBar";
import SideBar from "../Components/SideBar";
import {
  editProfile,
  followUser,
  unfollowUser,
} from "../features/auth/authSlice";
import { getpostSorted } from "../features/timeline/getpostSorted";
import { getUserPosts, userPosts } from "../features/timeline/postSlice";
import "./Profile.css";

function Profile() {
  const { userDetail, token } = useSelector((state) => state.auth);
  const { profileUsername } = useParams();
  const { usersPost, post, status } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [postContent, setPostContent] = useState({});
  const [userFol, setUserFol] = useState("Follow");
  const [anyUser, setAnyUser] = useState({});
  const [editProfileModal, setEditProfileModal] = useState(false);

  const isActiveUser = userDetail.username === profileUsername ? true : false;

  const handlePost = (event) => {
    setPostContent({
      ...postContent,
      content: event.target.value,
    });
  };

  const handleEditProfile = (userData) => {
    dispatch(editProfile({ token: token, formData: userData }));
    setEditProfileModal(false);
  };

  const handlePostSubmit = () => {
    dispatch(userPosts({ token: token, postContent: postContent }));
    setPostContent({ content: "" });
  };

  const getAnyUser = async (profileUsername) => {
    try {
      const res = await axios.get(`/api/users/${profileUsername}`);
      //   console.log(res);
      return res.data.user;
      //   setAnyUser(res.data.user);
    } catch (err) {
      console.log("wrng ", err);
    }
  };

  //   (async function () {
  //     console.log("a");
  //     let anyUser = await getAnyUser(profileUsername);
  //     console.log("ho", anyUser);
  //     // setAnyUser(anyUser);
  //   })();

  useEffect(() => {
    async function any() {
      const any = await getAnyUser(profileUsername);
      setAnyUser(any);
    }
    any();
    isActiveUser
      ? dispatch(getUserPosts({ username: userDetail.username }))
      : dispatch(getUserPosts({ username: profileUsername }));
  }, [post, userDetail, profileUsername]);

  // useEffect(() => {
  //   console.log("check");
  //   anyUser.followers?.map((user) => {
  //     user.username === userDetail.username
  //       ? setUserFol("UnFollow")
  //       : setUserFol("Follow");
  //   });
  // }, [dispatch]);

  const sorted_post = getpostSorted("Recent", usersPost);

  console.log("user: ", anyUser);

  const isFollowing = anyUser?.followers?.some(
    (any) => any.username === userDetail.username
  );
  console.log(isFollowing);
  return (
    <div className="container grid">
      <SideBar />

      <div class="flex flex-dir-col py-2 pos-relative">
        <div>
          <button
            onClick={() => {
              isFollowing
                ? dispatch(unfollowUser({ userId: anyUser._id, token: token }))
                : dispatch(followUser({ userId: anyUser._id, token: token }));
            }}
            class="btn px-1 py-1 border-bs border-radius bg-scn txt-white pos-absolute top-right"
          >
            {isFollowing ? "UnFollow" : "Follow"}
          </button>
        </div>
        <ProfileCard
          isActiveUser={isActiveUser}
          setEditProfileModal={setEditProfileModal}
          currUserDetail={isActiveUser ? userDetail : anyUser}
          usersPost={usersPost}
          followUser={followUser}
          unfollowUser={unfollowUser}
        />
        {isActiveUser ? (
          <div className="create__post border-radius border-vs flex p-0-5">
            <div className="row flex">
              <div className="av-lg txt br-scn bg-acc">
                {userDetail.username[0]}
                <span className="badge-act"></span>
              </div>
              <textarea
                value={postContent.content}
                onChange={handlePost}
                className="border-bs p-0-5"
                placeholder="Whats on your Mind?"
              ></textarea>
            </div>
            <button
              onClick={handlePostSubmit}
              className="btn bg-prm py-0-25 px-0-5 txt-white"
            >
              Send
            </button>
          </div>
        ) : (
          <></>
        )}

        {sorted_post.map((post) => {
          return <PostCard post={post} />;
        })}
      </div>

      <RightBar />
      {editProfileModal ? (
        <>
          <div className="overlay">
            <EditProfileModal
              userDetail={userDetail}
              setEditProfileModal={setEditProfileModal}
              handleEditProfile={handleEditProfile}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Profile;
