import React, { useState, useContext, useRef } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Context } from "../../App";
import draftToHtml from "draftjs-to-html";
import "./ArticleEditor.css";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import { useSelector } from "react-redux";

const ArticleEditor = () => {
  const user = useSelector((state) => state.user);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const title = useRef();
  const description = useRef();

  const onEditorStateChange = (value) => {
    setEditorState(value);
  };

  const publish = () => {
    console.log(title.current.value);
    console.log(description.current.value);
  };

  return (
    <div className="articleeditor">
      <div className="articleeditor--box-2">
        <div className="articleeditor__publish">
          <button type="button" onClick={publish}>
            Publish
          </button>
        </div>
      </div>
      <div className="articleeditor__title">
        <input type="text" placeholder="Title..." ref={title} />
      </div>
      <div className="articleeditor__description">
        <input type="text" placeholder="Description..." ref={description} />
      </div>
      <div className="articleeditor--box-1">
        <Editor
          editorState={editorState}
          toolbarClassName="articleToolbarClassName"
          wrapperClassName="articleWrapperClassName"
          editorClassName="articleEditorClassName"
          placeholder="What's on your mind?"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
    </div>
  );
};

export default ArticleEditor;
