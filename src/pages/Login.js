import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Signup from "../Components/Signup";
import SignIn from "../Components/SignIn";
import { authHandler } from "../features/auth/authSlice";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const isMounted = useRef(false);
  const [existingUser, existingUserToggle] = useState(true);
  const { status, error, errorMessage, token, login } = useSelector(
    (state) => state.auth
  );
  console.log("jieiej", status);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMounted.current) {
      navigate("/home");
    } else {
      isMounted.current = true;
    }
  }, [token]);

  const CheckStatus = () => {
    if (status === "loading") {
      return (
        <>
          {" "}
          <p>Loading</p>
        </>
      );
    } else if (status === "fullfiled" && !error) {
      // navigate("/home");
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
        <h4>
          Not Registered Yet?{" "}
          <span>
            <button
              onClick={() => {
                existingUserToggle(!existingUser);
              }}
              className="btn bg-scn px-1 py-0-5 border-bs"
            >
              Sign Up
            </button>
          </span>
        </h4>

        <h1>
          Welcome, Log in to your
          <p>OfficeNetwork</p>
          Account
        </h1>
      </div>
      <div class="col-right px-3 flex">
        {existingUser ? (
          <SignIn checkStatus={CheckStatus} />
        ) : (
          <Signup checkStatus={CheckStatus} />
        )}
      </div>
    </div>
  );
}

export default Login;
