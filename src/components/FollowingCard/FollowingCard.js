import React, { useState } from "react";
import "./FollowingCard.css";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { follow, unfollow } from "../actions/actions";
import { MdAddCircleOutline } from "react-icons/md";
import { MdRemoveCircleOutline } from "react-icons/md";
import { IconContext } from "react-icons";
import { styles } from "../../styles/styles";

const FollowingCard = ({ article }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(true);

  const followHandler = (userId) => {
    if (article._id === user._id) {
      return;
    }

    try {
      if (isFollowing) {
        dispatch(unfollow(userId));
      } else {
        dispatch(follow(userId));
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="followingcard--box-6">
      <Link to={`/profile/${article._id}?breadcrumb=articles`}>
        <div className="followingcard--box-8">
          <div className="followingcard--spacer">
            <Avatar
              article={{
                avatar: article.avatar,
                author: article.firstname,
              }}
            />
          </div>
          <div className="profilscreen--spacer">
            <h4 className="followingcard__author">
              {article.firstname}&nbsp;{article.lastname}
            </h4>
          </div>
        </div>
      </Link>
      <div className="followingcard-spacer">
        <button
          type="button"
          className="followingcard__unfollow"
          onClick={() => followHandler(article._id)}
        >
          <span className="followingcard--desktop">
            {isFollowing ? "Unfollow" : "Follow"}
          </span>
          <span className="followingcard--mobile">
            <IconContext.Provider value={styles.icons}>
              {isFollowing ? <MdRemoveCircleOutline /> : <MdAddCircleOutline />}
            </IconContext.Provider>
          </span>
        </button>
      </div>
    </div>
  );
};

export default FollowingCard;
