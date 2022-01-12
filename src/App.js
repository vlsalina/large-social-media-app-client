import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

//const domain = "https://large-social-media-app.herokuapp.com";
const domain = "http://localhost:5000";
const userId = "1f0cd2d4-eabd-467c-9da3-c66ed658c9af";

function App() {
  const clickHandler = async () => {
    try {
      await axios
        .post(`${domain}/api/auth/login`, { _id: userId })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button type="button" onClick={clickHandler}>
          LOGIN
        </button>
      </header>
    </div>
  );
}

export default App;
