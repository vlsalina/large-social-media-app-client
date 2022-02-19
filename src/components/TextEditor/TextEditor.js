import React, { useState, useContext } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./TextEditor.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { ArticleContext } from "../../screens/ArticleScreen/ArticleScreen";
import { RepliesContext } from "../Replies/Replies";

const TextEditor = () => {
  const { articleId, numReplies, setNumReplies, article } =
    useContext(ArticleContext);
  const { replies, setReplies } = useContext(RepliesContext);

  const user = useSelector((state) => state.user);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (value) => {
    setEditorState(value);
  };

  /* HOW TO GET VALUE FROM USER INPUT */
  //    <textarea
  //      disabled
  //      value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
  //    />

  const submitHandler = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_DOMAIN}/api/replies/addReply`,
        {
          articleId: articleId,
          articleAuthorId: article.authorId,
          content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        },
        { headers: { authorization: `Bearer ${user.accessToken}` } }
      );

      let date = new Date();

      setReplies(
        replies.concat({
          articleId: articleId,
          articleAuthorId: article.authorId,
          author: `${user.firstname} ${user.lastname}`,
          userId: user._id,
          avatar: user.avatar ? user.avatar : "",
          content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
          likes: [],
          createdAt: date.toISOString(),
        })
      );

      setEditorState("");
      setNumReplies(numReplies + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="editor">
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
      <div className="editor--box-1">
        <div className="editor--box-2">
          <button type="button">Cancel</button>
        </div>
        <div className="editor--box-2">
          <button type="button" onClick={submitHandler}>
            Respond
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
