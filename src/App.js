import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import AccountScreen from "./components/AccountScreen/AccountScreen";
import ArticleScreen from "./components/ArticleScreen/ArticleScreen";
import AuthorScreen from "./components/AuthorScreen/AuthorScreen";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import MainFeedScreen from "./components/MainFeedScreen/MainFeedScreen";
import ProfileScreen from "./components/ProfileScreen/ProfileScreen";
import RegisterScreen from "./components/RegisterScreen/RegisterScreen";

//const domain = "https://large-social-media-app.herokuapp.com";
const domain = "http://localhost:5000";
const userId = "1f0cd2d4-eabd-467c-9da3-c66ed658c9af";

export const Context = React.createContext();

function App() {
  const clickHandler = async () => {
    try {
      await axios
        .post(`${domain}/api/auth/login`, { _id: userId })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Context.Provider value={{ domain }}>
          <Routes>
            <Route exact path="/" element={<MainFeedScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/account" element={<AccountScreen />} />
            <Route path="/author" element={<AuthorScreen />} />
            <Route path="/article" element={<ArticleScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        </Context.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
