import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostCard from "./PostCard";
import RightBar from "./RightBar";
import SideBar from "./SideBar";

function Post() {
  const [anyPost, setAnyPost] = useState();
  const { post, status } = useSelector((state) => state.post);
  const { post_id } = useParams();
  //   console.log(post_id);
  //   const getAnyPost = async (post_id) => {
  //     try {
  //       const res = await axios.get(`/api/posts/${post_id}`);
  //       console.log(res);
  //       return res.data.user;
  //       //   setAnyUser(res.data.user);
  //     } catch (err) {
  //       console.log("wrng ", err);
  //     }
  //   };

  useEffect(() => {
    fetch(`/api/posts/${post_id}`)
      .then((response) => response.json())
      .then((data) => setAnyPost(data));
  }, [post, status]);
  return (
    <div className="container grid">
      <SideBar />
      <div className="flex flex-dir-col py-2 pos-relative">
        {anyPost && <PostCard post={anyPost.post} />}
      </div>
      <RightBar />
    </div>
  );
}

export default Post;
