import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import ArticleScreen from "./components/ArticleScreen/ArticleScreen";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import MainFeedScreen from "./components/MainFeedScreen/MainFeedScreen";
import ProfileScreen from "./components/ProfileScreen/ProfileScreen";
import RegisterScreen from "./components/RegisterScreen/RegisterScreen";
import CreateArticleScreen from "./components/CreateArticleScreen/CreateArticleScreen";
import TopicScreen from "./components/TopicScreen/TopicScreen";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

//const domain = "https://large-social-media-app.herokuapp.com";
const domain = "http://localhost:5000";

export const Context = React.createContext();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Context.Provider value={{ domain }}>
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<MainFeedScreen />} />
            </Route>
            <Route path="/article/:articleId" element={<PrivateRoute />}>
              <Route path="/article/:articleId" element={<ArticleScreen />} />
            </Route>
            <Route path="/profile/:userId" element={<PrivateRoute />}>
              <Route path="/profile/:userId" element={<ProfileScreen />} />
            </Route>
            <Route path="/topic/:topic" element={<PrivateRoute />}>
              <Route path="/topic/:topic" element={<TopicScreen />} />
            </Route>
            <Route path="/create" element={<PrivateRoute />}>
              <Route path="/create" element={<CreateArticleScreen />} />
            </Route>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
          </Routes>
        </Context.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
