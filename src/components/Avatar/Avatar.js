import "./Avatar.css";
import { colors } from "../../data/data";
import { getColor } from "../../utils";

const Avatar = ({ article }) => {
  return (
    <div className="avatar">
      <div
        className="avatar__color"
        style={{ backgroundColor: article.avatar }}
      />
      <div className="avatar__initial">{article.author[0]}</div>
    </div>
  );
};

export default Avatar;
