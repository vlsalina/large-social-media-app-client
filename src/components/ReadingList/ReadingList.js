import React, { useState, useEffect, useContext } from "react";
import "./ReadingList.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { Context } from "../../App";

const Favorites = ({ toShow }) => {
  return (
    <div className="favorites">
      <ul>
        {toShow.map((fav) => (
          <li key={fav._id}>{fav.title}</li>
        ))}
      </ul>
    </div>
  );
};

const ReadingList = () => {
  const { domain } = useContext(Context);
  const user = useSelector((state) => state.user);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`${domain}/api/users/getUser?id=${user._id}`, {
          headers: { authorization: `Bearer ${user.accessToken}` },
        })
        .then((result) => {
          Promise.all(
            result.data.favorites.map((x) => {
              return axios.get(
                `${domain}/api/articles/getArticle?articleId=${x}`,
                { headers: { authorization: `Bearer ${user.accessToken}` } }
              );
            })
          )
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
          //console.log(result);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <div className="readingList">Reading List</div>;
};

export default ReadingList;
