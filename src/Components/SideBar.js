import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { NavLink, useNavigate } from "react-router-dom";

function SideBar() {
  const isMounted = useRef(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   Clear Local Storage and navigate to "/" remove encodedtoken
  const handleLogout = () => {
    setTimeout(() => {
      dispatch(logoutUser());
    }, 2000);
  };

  useEffect(() => {
    if (isMounted.current) {
      navigate("/");
    } else {
      isMounted.current = true;
    }
  }, [token]);

  // Add Brand Logo and Logout Button
  return (
    <div class="col-1">
      <div class="flex pos-sticky py-2">
        <div class="tabs__container border-bs border-radius">
          <ul class="tabs grid">
            <li>
              <div className="tab px-1 txt-prm py-0-5">
                <NavLink to="/home">
                  <i class="fa-solid fa-house"></i>
                  <span class="hideMd"> Home </span>
                </NavLink>
              </div>
            </li>
            <li>
              <div className="tab px-1 py-0-5">
                <NavLink to="/explore">
                  <i class="fa-regular fa-building"></i>
                  <span class="hideMd"> Explore </span>
                </NavLink>
              </div>
            </li>
            <li>
              <div className="tab px-1 py-0-5">
                <NavLink to="/bookmark">
                  <i class="fa-regular fa-bookmark"></i>
                  <span class="hideMd"> BookMark </span>
                </NavLink>
              </div>
            </li>
            <li>
              <div className="tab px-1 py-0-5">
                <NavLink to="/profile">
                  <i class="fa-solid fa-user-tie"></i>
                  <span class="hideMd"> Profile </span>
                </NavLink>
              </div>
            </li>
            <li>
              <div class="tab px-1 py-0-5">
                <i class="fa-solid fa-user-tie"></i>
                <span class="hideMd" onClick={handleLogout}>
                  {" "}
                  Logout{" "}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
