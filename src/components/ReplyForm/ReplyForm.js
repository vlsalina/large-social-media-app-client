import React, { useState } from "react";
import "./ReplyForm.css";
import { useSelector } from "react-redux";

// Import the Slate editor factory.
import { createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

const ReplyForm = () => {
  const user = useSelector((state) => state.user);

  const [editor] = useState(() => withReact(createEditor()));
  // Add the initial value when setting up our state.
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "What's on your mind?" }],
    },
  ]);

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
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Editable />
      </Slate>
    </div>
  );
};

export default ReplyForm;
