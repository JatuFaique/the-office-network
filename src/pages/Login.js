import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authHandler } from "../features/auth/authSlice";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({});
  const { login, status, error, errorMessage } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const handleSignIn = () => {
    dispatch(authHandler(formData));
  };

  const handleFormData = (event) => {
    const field = event.target.name;
    setFormData({ ...formData, [field]: event.target.value });
  };

  //   if (login === true) {
  //     //navigate to
  //   }

  const CheckStatus = () => {
    if (status === "loading") {
      return (
        <>
          {" "}
          <p>Loading</p>
        </>
      );
    } else if (status === "fullfiled" && !error) {
      return (
        <>
          <p>Successfully Signed in</p>
        </>
      );
    } else {
      return (
        <>
          <p>{errorMessage}</p>
        </>
      );
    }
  };

  return (
    <div class="container__login">
      <div class="col-left grid-span2 flex px-3">
        <h1>
          Welcome, Log in to your
          <p>OfficeNetwork</p>
          Account
        </h1>
      </div>
      <div class="col-right px-3 flex">
        <p>{CheckStatus()}</p>
        <h2>Please Sign In</h2>
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
        <button onClick={handleSignIn} class="btn bg-scn px-2 py-0-5 txt-white">
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Login;
