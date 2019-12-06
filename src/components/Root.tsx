import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import All from "../pages/All";
import Single from "../pages/Single";

const Root: React.FC = () => {
  return (
    <Router>
      <Route exact path="/">
        <All />
      </Route>
      <Route exact path="/:country">
        <Single />
      </Route>
    </Router>
  );
};

export default Root;
