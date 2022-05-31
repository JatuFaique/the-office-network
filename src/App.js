import Mockman from "mockman-js";
import "./styles/styles.css";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/mockman" element={<Mockman />}></Route>
        <Route path="/explore" element={<Explore />}></Route>
      </Routes>

      {/* <Mockman /> */}
    </div>
  );
}

export default App;
