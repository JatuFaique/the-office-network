import React, { useState } from "react";

function EditProfileModal(props) {
  const [formData, setFormData] = useState({});
  const handleFormData = (event) => {
    const field = event.target.name;
    setFormData({ ...formData, [field]: event.target.value });
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
          <div class="input-field">
            <input
              name="username"
              id="email-field"
              class="border-bs"
              type="text"
              pattern=".*\S.*"
              required
              onChange={handleFormData}
            />
            <label for="email-field" class="placeholder txt">
              Enter UserName
            </label>
          </div>
          <div class="input-field">
            <input
              name="email"
              id="email-field"
              class="border-bs"
              type="text"
              pattern=".*\S.*"
              required
              onChange={handleFormData}
            />
            <label for="email-field" class="placeholder txt">
              Enter email
            </label>
          </div>
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
              name="portfolioLink"
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
