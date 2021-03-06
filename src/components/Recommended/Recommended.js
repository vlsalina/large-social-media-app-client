import "./Recommended.css";
import { topics } from "../../data/data";
import { Link } from "react-router-dom";

const Recommended = () => {
  return (
    <div className="recommended">
      <div className="recommended__title">
        <h2>Recommended Topics</h2>
      </div>
      <div className="recommended--box-1">
        <ul>
          {topics.map((topic) => (
            <li key={topic.name}>
              <Link to={`/topic/${topic.name}`}>
                <div className="recommended__topic">{topic.name}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Recommended;
