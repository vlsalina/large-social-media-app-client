import React, { useState } from "react";
import "./ReplyForm.css";
import { useSelector } from "react-redux";
import TextEditor from "../TextEditor/TextEditor";

const ReplyForm = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="replyform">
      <div className="replyform--box-1">
        <div>
          <img
            className="replyform__avatar"
            src={"/assets/icons8-circled-v-100.png"}
          />
        </div>
        <div className="replyform__name">
          <p>
            {user.firstname}&nbsp;{user.lastname}{" "}
          </p>
        </div>
      </div>
      <TextEditor />
    </div>
  );
};

export default ReplyForm;
