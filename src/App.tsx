import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { ListCategory } from "./components/Home/ListCategory";
import { AddCategory } from "./components/AddCategory/AddCategory";
import { EditCategory } from "./components/EditCategory/EditCategory";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/listCategory" element={<ListCategory />} />
        <Route path="/category/add" element={<AddCategory />} />
        <Route path="/category/:id" element={<EditCategory />} />
      </Routes>
    </div>
  );
}

export default App;
