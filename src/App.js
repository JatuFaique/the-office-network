import Mockman from "mockman-js";
import "./styles/styles.css";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>

      {/* <Mockman /> */}
    </div>
  );
}

export default App;
