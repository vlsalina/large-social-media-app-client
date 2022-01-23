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
import Loader from "./components/Loader/Loader";
import TextEditor from "./components/TextEditor/TextEditor";
import CreateArticleScreen from "./components/CreateArticleScreen/CreateArticleScreen";
import TopicScreen from "./components/TopicScreen/TopicScreen";

//const domain = "https://large-social-media-app.herokuapp.com";
const domain = "http://localhost:5000";

export const Context = React.createContext();

function App() {
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
            <Route path="/article/:articleId" element={<ArticleScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/topic/:topic" element={<TopicScreen />} />
            <Route path="/create" element={<CreateArticleScreen />} />
          </Routes>
        </Context.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
