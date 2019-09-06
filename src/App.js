import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./Components/NavBar";
import NewUser from "./Components/NewUser";
import SignIn from "./Components/SignIn";
import Gallery from "./Components/Gallery";
// import Tabs from "./Components/Tabs";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Route exact path="/" component={Gallery} />
        <Route path="/newUser" component={NewUser} />
        <Route path="/signIn" component={SignIn} />
        {/* <Route path="/tabs" component={Tabs} /> */}
      </Router>
    </div>
  );
}

export default App;
