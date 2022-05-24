import React, { useState, useRef, useEffect } from "react";
import { signUpHandler } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Signup({ checkStatus }) {
  const isMounted = useRef(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { status, error, errorMessage, token } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const handleFormData = (event) => {
    const field = event.target.name;
    setFormData({ ...formData, [field]: event.target.value });
  };
  const handleSignUp = () => {
    dispatch(signUpHandler(formData));
  };

  useEffect(() => {
    console.log("monten", isMounted);
    if (isMounted.current) {
      console.log("monten", isMounted);
      navigate("/home");
    } else {
      isMounted.current = true;
    }
  }, [token]);
  return (
    <div className="col-right px-3 flex">
      <h2>Create and Account</h2>
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
          name="password"
          id="email-field"
          class="border-bs"
          type="text"
          pattern=".*\S.*"
          onChange={handleFormData}
          required
        />
        <label for="email-field" class="placeholder txt">
          Set Password
        </label>
      </div>
      <button onClick={handleSignUp} class="btn bg-prm px-2 py-0-5 txt-white">
        Sign Up & Continue
      </button>
    </div>
  );
}

export default Signup;
