import React, { useState, useContext, useRef } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Context } from "../../App";
import draftToHtml from "draftjs-to-html";
import "./ArticleEditor.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { topics } from "../../data/data";
import MessageBox from "../MessageBox/MessageBox";
import { useNavigate } from "react-router-dom";
import { MdAddCircleOutline } from "react-icons/md";
import { MdRemoveCircleOutline } from "react-icons/md";
import { IconContext } from "react-icons";

const styles = {
  icon: {
    size: "2rem",
  },
};

const ArticleEditor = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { domain } = useContext(Context);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [category, setCategory] = useState("");
  const [imgaddress, setImgAddress] = useState("");
  const [imgsubmit, setImgSubmit] = useState(false);
  const [error, setError] = useState();
  const title = useRef();
  const description = useRef();

  const onEditorStateChange = (value) => {
    setEditorState(value);
  };

  const publish = async () => {
    if (!category) {
      setError("Please choose a topic.");
      return;
    }

    if (!title.current.value) {
      setError("Please provide a title.");
      return;
    }

    if (!description.current.value) {
      setError("Please provide a description.");
      return;
    }

    let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    if (html.length < 100) {
      setError("Please provide a content body (100 chars min.)");
      return;
    }

    let newArticle = {
      category: category,
      title: title.current.value,
      author: `${user.firstname} ${user.lastname}`,
      authorId: user._id,
      avatar: user.avatar,
      image: imgaddress,
      snippet: description.current.value,
      description: description.current.value,
      content: html,
    };

    try {
      await axios.post(`${domain}/api/articles/createArticle`, newArticle, {
        headers: { authorization: `Bearer ${user.accessToken}` },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const categoryHandler = (x, index) => {
    setCategory(x);
    setError();

    let categories = document.getElementsByClassName("articleeditor__topic");

    Array.from(categories).forEach((c, idx) => {
      if (idx !== index) {
        c.classList.remove("articleeditor__topic--active");
        c.classList.add("articleeditor__topic--normal");
      }
    });

    categories[index].classList.remove("articleeditor__topic--normal");
    categories[index].classList.add("articleeditor__topic--active");
  };

  const submitImg = (e) => {
    setImgSubmit(false);
    setImgAddress(e.target.value);
  };

  const cancelImgSubmit = () => {
    setImgSubmit(false);
    setImgAddress("");
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
      {error && <MessageBox message={error} />}
      <div className="articleeditor--box-3">
        <ul>
          {topics.map((x, index) => (
            <li key={x.name}>
              <button
                className="articleeditor__topic articleeditor__topic--normal"
                type="button"
                onClick={() => categoryHandler(x.name, index)}
              >
                {x.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="articleeditor__title">
        <input type="text" placeholder="Title..." ref={title} />
      </div>
      <div className="articleeditor__description">
        <input type="text" placeholder="Description..." ref={description} />
      </div>
      <div className="articleeditor--box-4">
        <div className="articleeditor__imginput">
          <input
            type="text"
            placeholder="Please enter main image address here..."
            value={imgaddress}
            onChange={(e) => submitImg(e)}
          />
        </div>
        <div>
          <button type="button" onClick={() => setImgSubmit(true)}>
            <IconContext.Provider value={styles.icon}>
              <MdAddCircleOutline />
            </IconContext.Provider>
          </button>
        </div>
        <div>
          <button type="button" onClick={() => cancelImgSubmit(true)}>
            <IconContext.Provider value={styles.icon}>
              <MdRemoveCircleOutline />
            </IconContext.Provider>
          </button>
        </div>
      </div>
      <div className="articleeditor--box-1">
        {imgsubmit && (
          <div className="articleeditor__image">
            <img src={imgaddress} alt="main article" />
          </div>
        )}
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
