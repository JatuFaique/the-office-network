import React, { useEffect, useState, useRef } from "react";
import { authHandler } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usersHandler } from "../features/users/usersSlice";

function SignIn({ checkStatus }) {
  const isMounted = useRef(false);
  const [formData, setFormData] = useState({});
  const { status, error, errorMessage, token } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleFormData = (event) => {
    const field = event.target.name;
    setFormData({ ...formData, [field]: event.target.value });
  };
  const handleSignIn = () => {
    dispatch(authHandler(formData));
    dispatch(usersHandler());
    // navigate("/home");
  };

  const handleTest = () => {
    setFormData({
      username: "JatuFaique",
      password: "pass@123",
    });
  };
  useEffect(() => {
    if (isMounted.current) {
      navigate("/home");
    } else {
      isMounted.current = true;
    }
  }, [token]);

  return (
    <div className="col-right px-3 flex">
      <h2>Please Sign In</h2>
      <p>{checkStatus()}</p>
      <div class="input-field">
        <input
          value={formData.username}
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
          value={formData.password}
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
      <button onClick={handleTest} class="btn bg-scn px-2 py-0-5 txt-white">
        Test Credentials
      </button>
    </div>
  );
}

export default SignIn;
