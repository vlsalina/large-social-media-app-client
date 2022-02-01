import React from "react";
import "./ReplyForm.css";
import { useSelector } from "react-redux";
import TextEditor from "../TextEditor/TextEditor";

const ReplyForm = () => {
  return (
    <div className="replyform">
      <TextEditor />
    </div>
  );
};

export default ReplyForm;
