import "./NotFoundScreen.css";
import { useNavigate } from "react-router-dom";

const NotFoundScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <div className="notfound--box-1">
        <div>
          <h1 className="notfound__title notfound--shadow">404</h1>
        </div>
        <div className="notfound--spacer">
          <p className="notfound__description notfound--shadow">
            Sorry, we couldn't find that page.
          </p>
        </div>
        <div>
          <button
            type="button"
            className="notfound__redirect"
            onClick={() => navigate("/login")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundScreen;
