import Mockman from "mockman-js";
import "./styles/styles.css";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";
import Post from "./Components/Post";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/mockman" element={<Mockman />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route path="/bookmark" element={<Bookmarks />}></Route>
          <Route path="/profile/:profileUsername" element={<Profile />}></Route>
          <Route path="/:post_id" element={<Post />}></Route>
        </Routes>

        {/* <Mockman /> */}
      </div>
    </>
  );
}

export default App;
