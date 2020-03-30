import React from "react";
import Home from './components/Home/Home';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        {/* <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} /> */}
      </div>
    </Router>
  );
}

export default App;