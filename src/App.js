import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArticleScreen from "./screens/ArticleScreen/ArticleScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import MainFeedScreen from "./screens/MainFeedScreen/MainFeedScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateArticleScreen from "./screens/CreateArticleScreen/CreateArticleScreen";
import TopicScreen from "./screens/TopicScreen/TopicScreen";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NotFoundScreen from "./screens/NotFoundScreen/NotFoundScreen";

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
