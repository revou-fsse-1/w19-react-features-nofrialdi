import { Route, Routes } from "react-router-dom";
import "./App.css";
// import { Login } from "./components/Login/Login";
// import { Register } from "./components/Register/Register";
import { Home } from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} /> */}
        <Route path="/Home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
