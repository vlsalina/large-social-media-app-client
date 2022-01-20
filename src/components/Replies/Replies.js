import React, { useState, useEffect, useContext } from "react";
import ReplyForm from "../ReplyForm/ReplyForm";
import "./Replies.css";
import axios from "axios";
import { Context } from "../../App";
import { ArticleContext } from "../ArticleScreen/ArticleScreen";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { formatDate } from "../../utils";

export const RepliesContext = React.createContext();

const Replies = () => {
  const user = useSelector((state) => state.user);
  const { domain } = useContext(Context);
  const { articleId } = useContext(ArticleContext);

  const [replies, setReplies] = useState();

  useEffect(() => {
    axios
      .get(`${domain}/api/replies/getAllReplies?articleId=${articleId}`, {
        headers: { authorization: `Bearer ${user.accessToken}` },
      })
      .then((response) => setReplies(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="replies">
      <RepliesContext.Provider value={{ replies, setReplies }}>
        <ReplyForm />
        <div className="replies--box-1">
          {replies &&
            replies.map((x) => (
              <div className="replies--box-2">
                <div className="replies--box-3">
                  <div className="replies__avatar">
                    <img src={"/assets/icons8-circled-v-100.png"} />
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
