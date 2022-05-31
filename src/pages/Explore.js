import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostCard from "../Components/PostCard";
import RightBar from "../Components/RightBar";
import SideBar from "../Components/SideBar";
import { getpostSorted } from "../features/timeline/getpostSorted";
import { getPosts, sortBy, userPosts } from "../features/timeline/postSlice";
import "./Home.css";

function Explore() {
  const { post, status } = useSelector((state) => state.post);
  const { userDetail, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showBy, setShowBy] = useState("Recent");
  useEffect(() => {
    //   Get posts
    dispatch(getPosts());
  }, []);

  useEffect(() => {
    dispatch(sortBy(getpostSorted(showBy, post)));
  }, [showBy, status]);

  return (
    <div className="container grid">
      <SideBar />
      <div className="col-2">
        <div className="flex py-2"></div>
        <div className="filter border-bs border-radius flex">
          <div
            onClick={() => {
              setShowBy("Trending");
            }}
            className={
              "btn filter__trending p-1 " +
              (showBy === "Trending" ? "txt-bold txt-scn" : "")
            }
          >
            <i className="fa-solid fa-fire"></i>Trending
          </div>
          <div
            onClick={() => {
              setShowBy("Recent");
            }}
            className={
              "btn filter__recent p-1 " +
              (showBy === "Recent" ? "txt-bold txt-scn" : "")
            }
          >
            <i className="fa-solid fa-bolt"></i>Recent
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

export default Explore;
