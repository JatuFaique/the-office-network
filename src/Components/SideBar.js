import React from "react";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();
  //   Clear Local Storage and navigate to "/" remove encodedtoken
  const handleLogout = () => {
    setTimeout(() => {
      console.log("adio");
      localStorage.clear();
      navigate("/");
    }, 2000);
  };

  // Add Brand Logo and Logout Button
  return (
    <div class="col-1">
      <div class="flex pos-sticky py-2">
        <div class="tabs__container border-bs border-radius">
          <ul class="tabs grid">
            <li>
              <div class="tab px-1 txt-prm py-0-5">
                <i class="fa-solid fa-house"></i>
                <span class="hideMd"> Home </span>
              </div>
            </li>
            <li>
              <div class="tab px-1 py-0-5">
                <i class="fa-regular fa-building"></i>
                <span class="hideMd"> Explore </span>
              </div>
            </li>
            <li>
              <div class="tab px-1 py-0-5">
                <i class="fa-regular fa-bookmark"></i>
                <span class="hideMd"> BookMark </span>
              </div>
            </li>
            <li>
              <div class="tab px-1 py-0-5">
                <i class="fa-solid fa-user-tie"></i>
                <span class="hideMd"> Profile </span>
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
