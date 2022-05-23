import React, { useState } from "react";
import { authHandler } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SignIn({ checkStatus }) {
  const [formData, setFormData] = useState({});
  const { status, error, errorMessage } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleFormData = (event) => {
    const field = event.target.name;
    setFormData({ ...formData, [field]: event.target.value });
  };
  const handleSignIn = () => {
    dispatch(authHandler(formData));
    navigate("/home");
  };
  return (
    <div className="col-right px-3 flex">
      <h2>Please Sign In</h2>
      <p>{checkStatus()}</p>
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
          name="password"
          id="email-field"
          class="border-bs"
          type="text"
          pattern=".*\S.*"
          onChange={handleFormData}
          required
        />
        <label for="email-field" class="placeholder txt">
          Enter Password
        </label>
      </div>
      <button onClick={handleSignIn} class="btn bg-prm px-2 py-0-5 txt-white">
        Sign In
      </button>
    </div>
  );
}

export default SignIn;
