import React, { useEffect } from "react";
import notfound from "../assets/not-found.svg";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../Components/PostCard";
import RightBar from "../Components/RightBar";
import SideBar from "../Components/SideBar";
import { getUserBookMarks } from "../features/timeline/postSlice";

function Bookmarks() {
  const { bookmarks, post } = useSelector((state) => state.post);
  const { token, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("fired");
    dispatch(getUserBookMarks({ token }));
  }, [dispatch, status]);

  const bookmarkedPosts = post.filter((post) => bookmarks.includes(post._id));

  return (
    <div className="container grid">
      <SideBar />
      <div className="col-2 py-1">
        {bookmarkedPosts.length > 0 ? (
          bookmarkedPosts.map((post) => {
            return <PostCard post={post} />;
          })
        ) : (
          <>
            <div className="container just-center flex-dir-col not__found flex">
              <img src={notfound} border="0" />
              <p className="bold txt-prm">No Bookmarks yet!</p>
            </div>
          </>
        )}
      </div>
      <RightBar />
    </div>
  );
}

export default Bookmarks;
