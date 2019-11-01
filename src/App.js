import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Restaurant from "./Restaurant";
import DataFetching from "./DataFetching";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Simple React App with experiments of Concurrent mode features</p>
        <a
          className="App-link"
          href="https://reactjs.org/docs/concurrent-mode-intro.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the docs!
        </a>
      </header>

      <div className="App-experiments">
        <DataFetching />
        <Restaurant />
      </div>
    </div>
  );
};

export default App;
