import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArticleScreen from "./screens/ArticleScreen/ArticleScreen";
import MainFeedScreen from "./screens/MainFeedScreen/MainFeedScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import CreateArticleScreen from "./screens/CreateArticleScreen/CreateArticleScreen";
import TopicScreen from "./screens/TopicScreen/TopicScreen";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NotFoundScreen from "./screens/NotFoundScreen/NotFoundScreen";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";

function App() {
  return (
    <div className="App">
      <LoginModal />
      <RegisterModal />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MainFeedScreen />} />
          <Route path="/article/:articleId" element={<ArticleScreen />} />
          <Route path="/profile/:userId" element={<ProfileScreen />} />
          <Route path="/topic/:topic" element={<TopicScreen />} />
          <Route path="/create" element={<CreateArticleScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
