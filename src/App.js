import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Planets from "./components/Planets";
import People from "./components/People";
import { ReactQueryDevtools } from "react-query-devtools";

function App() {
  const [page, setPage] = useState("planets");

  return (
    <>
      <div className="App">
        <h1>Star Wars Info</h1>
        <Navbar setPage={setPage} />
        <div className="content">
          <Content activePage={page} />
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

const Content = ({ activePage }) => {
  switch (activePage) {
    default:
    case "planets":
      return <Planets />;
    case "people":
      return <People />;
  }
};

export default App;
