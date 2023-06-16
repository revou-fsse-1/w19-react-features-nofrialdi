import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import ListCategory from "./components/Home/ListCategory";
import { AddCategory } from "./components/AddCategory/AddCategory";
import { EditCategory } from "./components/EditCategory/EditCategory";
import PrivateLayout from "./Private/PrivateLayout";
import DefaultLayout from "./Publik/DefaultLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path="/" index element={<ListCategory />} />
          <Route path="/category" element={<ListCategory />} />
          <Route path="/category/add" element={<AddCategory />} />
          <Route path="/category/edit/:id" element={<EditCategory />} />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
