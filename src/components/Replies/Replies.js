import React, { useState, useEffect, useContext } from "react";
import ReplyForm from "../ReplyForm/ReplyForm";
import "./Replies.css";
import axios from "axios";
import { ArticleContext } from "../../screens/ArticleScreen/ArticleScreen";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { formatDate } from "../_helpers/general.helpers";
import { GrClose } from "react-icons/gr";
import { IconContext } from "react-icons";
import Avatar from "../Avatar/Avatar";
import { repliesHelpers } from "../_helpers/replies.helper";
import { styles } from "../../styles/styles";

export const RepliesContext = React.createContext();

const Replies = () => {
  const user = useSelector((state) => state.user);
  const { articleId, setNumReplies } = useContext(ArticleContext);

  const [replies, setReplies] = useState();

  useEffect(() => {
    repliesHelpers
      .getAllReplies(articleId)
      .then((response) => {
        setReplies(response);
        setNumReplies(response.length);
      })
      .catch((error) => console.log(error));
  }, [
    articleId,
    process.env.REACT_APP_DOMAIN,
    setNumReplies,
    user.accessToken,
  ]);

  const closeHandler = () => {
    document
      .getElementsByClassName("replies")[0]
      .classList.remove("replies--open");

    document
      .getElementsByClassName("replies")[0]
      .classList.add("replies--close");
  };

  return (
    <div className="replies">
      <RepliesContext.Provider value={{ replies, setReplies }}>
        <div className="replies--box-4">
          {replies && (
            <div>
              <h2>Responses ({replies.length})</h2>
            </div>
          )}
          <div className="replies__close">
            <button type="button" onClick={closeHandler}>
              <IconContext.Provider value={styles.icons}>
                <GrClose />
              </IconContext.Provider>
            </button>
          </div>
        </div>
        <ReplyForm />
        <div className="replies--box-1">
          {replies &&
            replies.map((x, index) => (
              <div key={index} className="replies--box-2">
                <div className="replies--box-3">
                  <div className="replies__avatar">
                    <Avatar article={{ avatar: x.avatar, author: x.author }} />
                  </div>
                  <div className="replies__author">
                    <p>{x.author}</p>
                  </div>
                </div>
                <div className="replies__content">{parse(x.content)}</div>
                <div className="replies__date">{formatDate(x.createdAt)}</div>
              </div>
            ))}
        </div>
      </RepliesContext.Provider>
    </div>
  );
};

export default Replies;
