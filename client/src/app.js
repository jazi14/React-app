import React from "react";
import {
  BrowserRouter as Router,
  Route,
  
  Switch
  
} from "react-router-dom";
import Articles from "./pages/Articles";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () =>
  <div>
    <Router>
      <Switch>
        <Route path="/" exact component={Articles} />
        <Route path="/articles" exact component={Articles} />
        <Route path="/articles/:id" exact component={Detail} />
        <Route component={NoMatch} />
        <Nav />
        <Articles />
      </Switch>
    </Router>
  </div>;

export default App;