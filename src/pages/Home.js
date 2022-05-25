import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostCard from "../Components/PostCard";
import RightBar from "../Components/RightBar";
import SideBar from "../Components/SideBar";
import { getPosts, userPosts } from "../features/timeline/postSlice";
import "./Home.css";

function Home() {
  // const navigate = useNavigate();
  const { post } = useSelector((state) => state.post);
  const { userDetail, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [postContent, setPostContent] = useState({});

  const handlePost = (event) => {
    setPostContent({
      ...postContent,
      content: event.target.value,
    });
  };

  const handlePostSubmit = () => {
    dispatch(
      userPosts({ token: token, postContent: postContent }, postContent)
    );
  };

  useEffect(() => {
    //   Get posts
    console.log("hdhd");
    dispatch(getPosts());
  }, []);

  // console.log("bhaiy", post);

  return (
    <div className="container grid">
      <SideBar />
      <div class="col-2">
        <div class="flex py-2">
          <div class="create__post border-radius border-vs flex p-0-5">
            <div class="row flex">
              <div class="av-lg txt br-scn bg-acc">
                {userDetail[0]}
                <span class="badge-act"></span>
              </div>
              <textarea
                onChange={handlePost}
                class="border-bs p-0-5"
                placeholder="Whats on your Mind?"
              ></textarea>
            </div>
            <button
              onClick={handlePostSubmit}
              class="btn bg-prm py-0-25 px-0-5 txt-white"
            >
              Send
            </button>
          </div>
        </div>
        <div class="filter border-bs border-radius flex">
          <div class="filter__trending p-1 txt bold txt-scn">
            <i class="fa-solid fa-fire"></i>Trending
          </div>
          <div class="filter__recent p-1 txt">
            <i class="fa-solid fa-bolt"></i>Recent
          </div>
        </div>
        {post.map((post) => {
          return <PostCard post={post} />;
        })}
      </div>
      <RightBar />
    </div>
  );
}

export default Home;
