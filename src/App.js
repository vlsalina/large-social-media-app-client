import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArticleScreen from "./components/ArticleScreen/ArticleScreen";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import MainFeedScreen from "./components/MainFeedScreen/MainFeedScreen";
import ProfileScreen from "./components/ProfileScreen/ProfileScreen";
import RegisterScreen from "./components/RegisterScreen/RegisterScreen";
import CreateArticleScreen from "./components/CreateArticleScreen/CreateArticleScreen";
import TopicScreen from "./components/TopicScreen/TopicScreen";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NotFoundScreen from "./components/NotFoundScreen/NotFoundScreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
