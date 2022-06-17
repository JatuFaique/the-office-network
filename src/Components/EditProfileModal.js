import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersHandler } from "../features/users/usersSlice";

function EditProfileModal(props) {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    profilePic: props.userDetail.profilePic,
  });
  const handleFormData = (event) => {
    const field = event.target.name;
    setFormData({ ...formData, [field]: event.target.value });
    dispatch(usersHandler());
  };

  const updateImageHandler = async (image) => {
    try {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "kxuf4wob");
      const requestOptions = {
        method: "POST",
        body: data,
      };
      await fetch(
        "https://api.cloudinary.com/v1_1/dn3a9onu6/upload",
        requestOptions
      )
        .then((response) => response.json())
        .then((json) => {
          setFormData({ ...formData, profilePic: json.url });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="mod dis-flex-col s-30">
      <div className="sec-header bg-prm p-3">
        <div className="mod-title">Modal Header</div>
        <i
          onClick={() => props.setEditProfileModal(false)}
          className="btn fas fa-times"
        ></i>
      </div>
      <div className="sec-body  p-3">
        <form>
          <div class="av-s">
            <img src={formData.profilePic} />
          </div>
          <input
            accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp"
            type="file"
            onChange={(e) => updateImageHandler(e.target.files[0])}
          />

          <div class="input-field">
            <input
              name="bio"
              id="email-field"
              class="border-bs"
              type="text"
              pattern=".*\S.*"
              required
              onChange={handleFormData}
            />
            <label for="email-field" class="placeholder txt">
              Enter Bio
            </label>
          </div>
          <div class="input-field">
            <input
              name="portfolio"
              id="email-field"
              class="border-bs"
              type="text"
              pattern=".*\S.*"
              required
              onChange={handleFormData}
            />
            <label for="email-field" class="placeholder txt">
              Enter Portfolio Link
            </label>
          </div>
        </form>
      </div>
      <div className="sec-footer p-3">
        <button
          onClick={() => props.handleEditProfile(formData)}
          className="btn txt-white bg-prm"
        >
          Save
        </button>
        <button
          onClick={() => props.setEditProfileModal(false)}
          className="btn txt-grey bg-scn"
        >
          Close
        </button>
      </div>
    </section>
  );
}

export default EditProfileModal;
