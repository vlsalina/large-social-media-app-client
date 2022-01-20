import React, { useState } from "react";
import "./ReplyForm.css";
import { useSelector } from "react-redux";
import TextEditor from "../TextEditor/TextEditor";

const ReplyForm = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="replyform">
      <TextEditor />
    </div>
  );
};

export default ReplyForm;
