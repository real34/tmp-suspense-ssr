import React, { Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import { delay, Loading } from "./helpers";

const DataFetching = React.lazy(() =>
  import("./DataFetching").then(delay(500))
);
const Restaurant = React.lazy(() => import("./Restaurant").then(delay(2000)));
const NeverLoading = React.lazy(() => new Promise(() => {}));

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
        <Suspense fallback={<Loading />}>
          <DataFetching />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <Restaurant />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <NeverLoading />
        </Suspense>
      </div>
    </div>
  );
};

export default App;
