import React, { useEffect, useState } from "react";
import "./AuthorProfile.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { follow, unfollow } from "../actions/actions";

const AuthorProfile = ({ author }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // check if author is already in user's following list
    let exists = user.following.find((x) => x.userId === author._id);
    if (exists) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, []);

  const followHandler = () => {
    if (user._id === author._id) {
      return;
    }

    try {
      if (isFollowing) {
        dispatch(unfollow(author._id));
      } else {
        dispatch(follow(author._id));
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside className="authorprofile">
      <div className="authorprofile__avatar">
        <img src={`/assets/large-logo.png`} />
      </div>
      <div className="authorprofile__author">
        <p>
          {author.firstname} {author.lastname}
        </p>
      </div>
      <div className="authorprofile__story">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      {user._id !== author._id && (
        <div className="authorprofile--box-1">
          <button
            className="authorprofile__follow"
            type="button"
            onClick={followHandler}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      )}
    </aside>
  );
};

export default AuthorProfile;
