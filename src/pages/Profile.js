import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditProfileModal from "../Components/EditProfileModal";
import PostCard from "../Components/PostCard";
import ProfileCard from "../Components/ProfileCard";
import RightBar from "../Components/RightBar";
import SideBar from "../Components/SideBar";
import { editProfile } from "../features/auth/authSlice";
import { getpostSorted } from "../features/timeline/getpostSorted";
import { getUserPosts, userPosts } from "../features/timeline/postSlice";
import "./Profile.css";

function Profile() {
  const { userDetail, token } = useSelector((state) => state.auth);
  const { usersPost, post, status } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [postContent, setPostContent] = useState({});
  const [editProfileModal, setEditProfileModal] = useState(false);
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

  useEffect(() => {
    dispatch(getUserPosts({ username: userDetail.username }));
  }, [post]);

  console.log("mama", usersPost);

  const sorted_post = getpostSorted("Recent", usersPost);
  return (
    <div className="container grid">
      <SideBar />
      <div class="flex flex-dir-col py-2">
        <ProfileCard
          setEditProfileModal={setEditProfileModal}
          userDetail={userDetail}
          usersPost={usersPost}
        />
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
