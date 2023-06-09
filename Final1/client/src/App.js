import "./App.css";
import DataProvider from "./context/DataProvider";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

//components
import Login from "./components/account/Login";
import Home from "./components/Home/Home";
import Header from "./components/header/Header";
import { useState } from "react";
import CreatePost from "./components/Create/CreatePost";
import DetailView from "./components/details/DetailView";
import Update from "./components/Create/Update";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";

const PrivateRoute = ({ isAuth, ...props }) => {
  return isAuth ? (
    <>
      <Header />  
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isAuth, IsUserAuth] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{ marginTop: 64 }}>
          <Routes>
            <Route path="/login" element={<Login IsUserAuth={IsUserAuth} />} />
            <Route path="/" element={<PrivateRoute isAuth={isAuth} />}>
              <Route path="/" element={<Home />} />
            </Route>

            <Route path="/create" element={<PrivateRoute isAuth={isAuth} />}>
              <Route path="/create" element={<CreatePost />} />
            </Route>

            <Route path="/details/:id" element={<PrivateRoute isAuth={isAuth} />}>
              <Route path="/details/:id" element={<DetailView />} />
            </Route>


            <Route path="/update/:id" element={<PrivateRoute isAuth={isAuth} />}>
              <Route path="/update/:id" element={<Update />} />
            </Route>

            <Route path='/about' element={<PrivateRoute isAuth={isAuth} />} >
              <Route path='/about' element={<About />} />
            </Route>

            <Route path='/contact' element={<PrivateRoute isAuth={isAuth} />} >
              <Route path='/contact' element={<Contact />} />
            </Route>

          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
