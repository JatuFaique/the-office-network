import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../features/auth/authSlice";

function RightBar() {
  const { token, userDetail } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const handleFollow = (userId) => {
    const userInfo = { userId, token };
    // console.log(userInfo);
    dispatch(followUser(userInfo));
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      if (response.status === 200 || 201) {
        // console.log("gg", response.data);

        setUsers(response.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const getNonFollow = (users) => {
    if (users) {
      const usernames = userDetail?.following.map(({ username }) => username);

      return users.filter(
        ({ username }) =>
          !usernames.includes(username) || username === userDetail?.username
      );
    }
  };

  const nonFollowUser = getNonFollow(users);

  return (
    <div class="col-3">
      <div class="flex pos-sticky p-2">
        <div class="user__suggestions p-0-25 border-radius">
          <h2 class="px-2 bold">Who to follow</h2>
          <div class="suggestions__lists px-1">
            {nonFollowUser.map((user) => {
              return (
                <div class="suggestion__item flex py-0-5">
                  <div class="av-lg txt-scn br-scn">{user.username[0]}</div>
                  <span>{user.username}</span>
                  <div>
                    <button
                      onClick={() => handleFollow(user._id)}
                      class="btn bg-scn txt-white border-bs"
                    >
                      Follow
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBar;
