import React, { useEffect, useState, useContext } from "react";
import Header from "../Header/Header";
import "./MainFeedScreen.css";
import axios from "axios";
import { Context } from "../../App";

const MainFeedScreen = () => {
  const { domain } = useContext(Context);

  useEffect(() => {}, []);

  return (
    <div className="mainFeedScreen">
      <Header />
      <main className="mainfeed"></main>
    </div>
  );
};

export default MainFeedScreen;
