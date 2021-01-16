import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import NewPet from "./pages/NewPet";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          {/* <Route exact path="/">
            <Books />
          </Route> */}
          <Route exact path="/About">
            <About />
          </Route>
          <Route exact path="/Contact">
            <Contact />
          </Route>
          <Route exact path="/NewPet">
            <Contact />
          </Route>
          <Route exact path="/Portfolio">
            <Portfolio />
          </Route>
          {/* <Route exact path="/books/:id">
            <Detail />
          </Route> */}
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
