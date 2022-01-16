import "./Recommended.css";
import { topics } from "../../data/data";
import { Link } from "react-router-dom";

const Recommended = () => {
  return (
    <div className="recommended">
      <div className="recommended-title">
        <h2>Recommended Topics</h2>
      </div>
      <div className="recommended-topics">
        <ul>
          {topics.map((topic) => (
            <li key={topic}>
              <Link to={`/topic?topic=${topic}`}>
                <div className="recommended-topic">{topic}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Recommended;
