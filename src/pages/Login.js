import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authHandler } from "../features/auth/authSlice";
import "./Login.css";

function Login() {
  const { login } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSignIn = () => {
    dispatch(authHandler());
    console.log("after daya");
  };
  console.log("hii", typeof login);

  //   if (login === true) {
  //     //navigate to
  //   }

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
        <p>{String(login)}</p>
        <h2>Please Sign In</h2>
        <div class="input-field">
          <input
            id="email-field"
            class="border-bs"
            type="text"
            pattern=".*\S.*"
            required
          />
          <label for="email-field" class="placeholder txt">
            Enter Email
          </label>
        </div>
        <div class="input-field">
          <input
            id="email-field"
            class="border-bs"
            type="text"
            pattern=".*\S.*"
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
